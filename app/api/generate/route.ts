import Replicate from "replicate";

// Type definitions for Replicate API responses
interface ReplicateOutput {
  output?: string | string[];
  data?: string | string[];
  url?: string;
  image?: string;
  result?: string;
  prediction?: {
    output?: string | string[];
  };
}

interface GenerateRequest {
  prompt: string;
}

interface GenerateResponse {
  imageUrl: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt }: GenerateRequest = await req.json();

    if (!prompt) {
      return Response.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Validate API token
    console.log("=== ENVIRONMENT DIAGNOSTICS ===");
    console.log("REPLICATE_API_TOKEN exists:", !!process.env.REPLICATE_API_TOKEN);
    console.log("REPLICATE_API_TOKEN length:", process.env.REPLICATE_API_TOKEN?.length || 0);
    console.log("REPLICATE_API_TOKEN starts with:", process.env.REPLICATE_API_TOKEN?.substring(0, 10) || "N/A");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("VERCEL:", process.env.VERCEL);
    console.log("Available env vars with REPLICATE:", Object.keys(process.env).filter(key => key.includes('REPLICATE')));
    
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error("REPLICATE_API_TOKEN is not set");
      console.error("Available env vars:", Object.keys(process.env).filter(key => key.includes('REPLICATE')));
      return Response.json(
        { error: "API token not configured. Please set REPLICATE_API_TOKEN in your .env.local file." },
        { status: 500 }
      );
    }

    console.log("=== Starting image generation ===");
    console.log("Prompt:", `dccomic ${prompt}`);
    console.log("API Token exists:", !!process.env.REPLICATE_API_TOKEN);
    console.log("API Token length:", process.env.REPLICATE_API_TOKEN?.length || 0);

    // Run model with comprehensive error handling
    let output: unknown;
    try {
      console.log("=== REPLICATE API CALL DIAGNOSTICS ===");
      console.log("Attempting predictions.create with model:", "resilientcoders/calvin-comic-cover:5e26874f460dbb4e0a13e468d9c6e6bebcaf91962a78eea2b88e96bd3d4c9fef");
      console.log("Input prompt:", `dccomic ${prompt}`);
      
      // Try using the streaming approach
      const prediction = await replicate.predictions.create({
        model: "resilientcoders/calvin-comic-cover:5e26874f460dbb4e0a13e468d9c6e6bebcaf91962a78eea2b88e96bd3d4c9fef",
        input: { prompt: `dccomic ${prompt}` },
      });

      console.log("Prediction created successfully:", prediction.id);
      console.log("Prediction status:", prediction.status);
      console.log("Prediction object keys:", Object.keys(prediction));
      
      // Wait for the prediction to complete
      console.log("Waiting for prediction to complete...");
      output = await replicate.wait(prediction);
      console.log("Prediction completed successfully");
      console.log("Output type:", typeof output);
      console.log("Output constructor:", output?.constructor?.name);
      
    } catch (replicateError) {
      console.error("=== REPLICATE API ERROR DIAGNOSTICS ===");
      console.error("Error type:", typeof replicateError);
      console.error("Error constructor:", replicateError?.constructor?.name);
      console.error("Error message:", replicateError instanceof Error ? replicateError.message : String(replicateError));
      console.error("Error stack:", replicateError instanceof Error ? replicateError.stack : "No stack trace");
      console.error("Full error object:", JSON.stringify(replicateError, null, 2));
      
      // Fallback to the original approach
      try {
        console.log("=== FALLBACK REPLICATE.RUN DIAGNOSTICS ===");
        console.log("Trying fallback replicate.run approach...");
        console.log("Model:", "resilientcoders/calvin-comic-cover:5e26874f460dbb4e0a13e468d9c6e6bebcaf91962a78eea2b88e96bd3d4c9fef");
        console.log("Input:", { prompt: `dccomic ${prompt}` });
        
        output = await replicate.run(
          "resilientcoders/calvin-comic-cover:5e26874f460dbb4e0a13e468d9c6e6bebcaf91962a78eea2b88e96bd3d4c9fef",
          {
            input: { prompt: `dccomic ${prompt}` },
          }
        );
        
        console.log("Fallback replicate.run succeeded");
        console.log("Fallback output type:", typeof output);
        console.log("Fallback output constructor:", output?.constructor?.name);
        
      } catch (fallbackError) {
        console.error("=== FALLBACK ERROR DIAGNOSTICS ===");
        console.error("Fallback error type:", typeof fallbackError);
        console.error("Fallback error constructor:", fallbackError?.constructor?.name);
        console.error("Fallback error message:", fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
        console.error("Fallback error stack:", fallbackError instanceof Error ? fallbackError.stack : "No stack trace");
        console.error("Full fallback error object:", JSON.stringify(fallbackError, null, 2));
        
        throw new Error(`Replicate API error: ${replicateError instanceof Error ? replicateError.message : 'Unknown error'}`);
      }
    }

    console.log("=== Raw Replicate Response ===");
    console.log("Output:", output);
    console.log("Output type:", typeof output);
    console.log("Output constructor:", output?.constructor?.name);
    console.log("Is ReadableStream?", output instanceof ReadableStream);
    console.log("Is Array?", Array.isArray(output));
    console.log("Is Object?", output && typeof output === "object");
    console.log("Output keys:", output && typeof output === "object" ? Object.keys(output) : "N/A");

    let imageUrl: string | null = null;

    // Handle different response formats
    if (output instanceof ReadableStream) {
      console.log("=== Processing ReadableStream ===");
      
      try {
        const reader = output.getReader();
        const chunks: Uint8Array[] = [];
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          if (value) {
            chunks.push(value);
          }
          done = readerDone;
        }

        // Combine chunks into a single Uint8Array
        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
        const combinedArray = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of chunks) {
          combinedArray.set(chunk, offset);
          offset += chunk.length;
        }

        console.log("Combined array length:", combinedArray.length);
        console.log("First 20 bytes:", Array.from(combinedArray.slice(0, 20)).map(b => b.toString(16).padStart(2, '0')).join(' '));
        console.log("Last 20 bytes:", Array.from(combinedArray.slice(-20)).map(b => b.toString(16).padStart(2, '0')).join(' '));

        // Check if this looks like binary image data
        const isBinaryData = combinedArray.length > 1000 && combinedArray.some(byte => byte < 32 && byte !== 9 && byte !== 10 && byte !== 13);
        console.log("Is binary data:", isBinaryData);

        if (isBinaryData) {
          console.log("=== Converting binary image data to base64 ===");
          // Convert the binary data to base64
          const base64Data = Buffer.from(combinedArray).toString('base64');
          // Determine image type based on binary signature
          let imageType = 'image/png'; // default
          if (combinedArray[0] === 0xFF && combinedArray[1] === 0xD8 && combinedArray[2] === 0xFF) {
            imageType = 'image/jpeg';
          } else if (combinedArray[0] === 0x89 && combinedArray[1] === 0x50 && combinedArray[2] === 0x4E && combinedArray[3] === 0x47) {
            imageType = 'image/png';
          } else if (combinedArray[0] === 0x47 && combinedArray[1] === 0x49 && combinedArray[2] === 0x46) {
            imageType = 'image/gif';
          } else if (combinedArray[0] === 0x52 && combinedArray[1] === 0x49 && combinedArray[2] === 0x46 && combinedArray[3] === 0x46) {
            imageType = 'image/webp';
          }
          
          console.log("Detected image type:", imageType);
          console.log("Base64 data length:", base64Data.length);
          
          // Create data URL for stateless deployment
          imageUrl = `data:${imageType};base64,${base64Data}`;
          console.log("Created data URL with type:", imageType);
          console.log("Data URL length:", imageUrl.length);
        } else {
          // Try to parse as JSON first
          try {
            const decoder = new TextDecoder();
            const streamText = decoder.decode(combinedArray);
            const parsedData = JSON.parse(streamText);
            console.log("Parsed JSON from stream:", parsedData);
            
            // Extract URL from parsed JSON
            imageUrl = parsedData.output?.[0] || 
                       parsedData.data?.[0] || 
                       parsedData.url ||
                       parsedData.image ||
                       (Array.isArray(parsedData) ? parsedData[0] : null);
            } catch (jsonError) {
              console.log("Not JSON, trying regex extraction...");
              console.log("JSON parse error:", jsonError);
              // If not JSON, try to extract URL with regex
              const decoder = new TextDecoder();
              const streamText = decoder.decode(combinedArray);
              const urlMatch = streamText.match(/https:\/\/replicate\.delivery\/[^\s"']+/);
              if (urlMatch) {
                imageUrl = urlMatch[0];
              }
            }
        }
      } catch (streamError) {
        console.error("Error processing stream:", streamError);
        throw new Error(`Stream processing error: ${streamError instanceof Error ? streamError.message : 'Unknown error'}`);
      }
    } else if (typeof output === "string") {
      console.log("=== Processing String Output ===");
      imageUrl = output;
    } else if (Array.isArray(output)) {
      console.log("=== Processing Array Output ===");
      console.log("Array length:", output.length);
      console.log("First element type:", typeof output[0]);
      console.log("First element is ReadableStream:", output[0] instanceof ReadableStream);
      
      // Check if the first element is a ReadableStream
      if (output[0] instanceof ReadableStream) {
        console.log("=== Processing ReadableStream from Array ===");
        
        try {
          const reader = output[0].getReader();
          const chunks: Uint8Array[] = [];
          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            if (value) {
              chunks.push(value);
            }
            done = readerDone;
          }

          // Combine chunks into a single Uint8Array
          const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
          const combinedArray = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of chunks) {
            combinedArray.set(chunk, offset);
            offset += chunk.length;
          }

          console.log("Combined array length:", combinedArray.length);
          console.log("First 20 bytes:", Array.from(combinedArray.slice(0, 20)).map(b => b.toString(16).padStart(2, '0')).join(' '));
          console.log("Last 20 bytes:", Array.from(combinedArray.slice(-20)).map(b => b.toString(16).padStart(2, '0')).join(' '));

          // Check if this looks like binary image data
          const isBinaryData = combinedArray.length > 1000 && combinedArray.some(byte => byte < 32 && byte !== 9 && byte !== 10 && byte !== 13);
          console.log("Is binary data:", isBinaryData);

          if (isBinaryData) {
            console.log("=== Converting binary image data to base64 ===");
            // Convert the binary data to base64
            const base64Data = Buffer.from(combinedArray).toString('base64');
            // Determine image type based on binary signature
            let imageType = 'image/png'; // default
            if (combinedArray[0] === 0xFF && combinedArray[1] === 0xD8 && combinedArray[2] === 0xFF) {
              imageType = 'image/jpeg';
            } else if (combinedArray[0] === 0x89 && combinedArray[1] === 0x50 && combinedArray[2] === 0x4E && combinedArray[3] === 0x47) {
              imageType = 'image/png';
            } else if (combinedArray[0] === 0x47 && combinedArray[1] === 0x49 && combinedArray[2] === 0x46) {
              imageType = 'image/gif';
            } else if (combinedArray[0] === 0x52 && combinedArray[1] === 0x49 && combinedArray[2] === 0x46 && combinedArray[3] === 0x46) {
              imageType = 'image/webp';
            }
            
            console.log("Detected image type:", imageType);
            console.log("Base64 data length:", base64Data.length);
            
            // Create data URL for stateless deployment
            imageUrl = `data:${imageType};base64,${base64Data}`;
            console.log("Created data URL with type:", imageType);
            console.log("Data URL length:", imageUrl.length);
          } else {
            // Try to parse as JSON first
            try {
              const decoder = new TextDecoder();
              const streamText = decoder.decode(combinedArray);
              const parsedData = JSON.parse(streamText);
              console.log("Parsed JSON from array stream:", parsedData);
              
              // Extract URL from parsed JSON
              imageUrl = parsedData.output?.[0] || 
                         parsedData.data?.[0] || 
                         parsedData.url ||
                         parsedData.image ||
                         (Array.isArray(parsedData) ? parsedData[0] : null);
            } catch (jsonError) {
              console.log("Not JSON, trying regex extraction from array stream...");
              console.log("JSON parse error:", jsonError);
              
              // Try multiple URL patterns
              const decoder = new TextDecoder();
              const streamText = decoder.decode(combinedArray);
              const urlPatterns = [
                /https:\/\/replicate\.delivery\/[^\s"']+/,
                /https:\/\/[^\s"']*\.(jpg|jpeg|png|gif|webp)/i,
                /https:\/\/[^\s"']*replicate[^\s"']*/i
              ];
              
              for (const pattern of urlPatterns) {
                const urlMatch = streamText.match(pattern);
                if (urlMatch) {
                  console.log("Found URL with pattern:", pattern, "URL:", urlMatch[0]);
                  imageUrl = urlMatch[0];
                  break;
                }
              }
              
              // If still no URL found, try to extract any URL
              if (!imageUrl) {
                const anyUrlMatch = streamText.match(/https:\/\/[^\s"']+/);
                if (anyUrlMatch) {
                  console.log("Found any URL:", anyUrlMatch[0]);
                  imageUrl = anyUrlMatch[0];
                }
              }
            }
          }
        } catch (streamError) {
          console.error("Error processing stream from array:", streamError);
          throw new Error(`Stream processing error: ${streamError instanceof Error ? streamError.message : 'Unknown error'}`);
        }
      } else {
        // If it's not a ReadableStream, treat it as a direct URL
        imageUrl = output[0];
      }
        } else if (output && typeof output === "object") {
          console.log("=== Processing Object Output ===");
          console.log("Object keys:", Object.keys(output));
          console.log("Object values:", Object.values(output));
          
          // Try multiple possible properties for prediction response
          const replicateOutput = output as ReplicateOutput;
          imageUrl = (Array.isArray(replicateOutput.output) ? replicateOutput.output[0] : replicateOutput.output) || 
                     (Array.isArray(replicateOutput.data) ? replicateOutput.data[0] : replicateOutput.data) || 
                     replicateOutput.url ||
                     replicateOutput.image ||
                     replicateOutput.result ||
                     (Array.isArray(replicateOutput.prediction?.output) ? replicateOutput.prediction.output[0] : replicateOutput.prediction?.output) ||
                     null;
                 
      // If imageUrl is still an array, take the first element
      if (Array.isArray(imageUrl)) {
        imageUrl = imageUrl[0];
      }
    }

    console.log("=== URL Extraction Result ===");
    console.log("Extracted imageUrl:", imageUrl);
    console.log("ImageUrl type:", typeof imageUrl);

    // Validate the image URL
    if (!imageUrl || typeof imageUrl !== "string") {
      console.error("=== VALIDATION FAILED ===");
      console.error("No valid image URL found");
      console.error("Full output for debugging:", JSON.stringify(output, null, 2));
      throw new Error("Model did not return a valid image URL");
    }

    // Ensure it's a valid URL (http/https or data URL)
    const validImageUrl = imageUrl as string;
    if (!validImageUrl.startsWith("http") && !validImageUrl.startsWith("data:")) {
      console.error("Invalid URL format:", validImageUrl);
      throw new Error("Invalid image URL format");
    }

    console.log("=== SUCCESS ===");
    console.log("Final image URL:", imageUrl);

        return Response.json({ imageUrl } as GenerateResponse);
  } catch (error) {
    console.error("=== MAIN ERROR HANDLER DIAGNOSTICS ===");
    console.error("Error type:", typeof error);
    console.error("Error constructor:", error?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    console.error("Full error object:", JSON.stringify(error, null, 2));
    console.error("Environment at error time:");
    console.error("- NODE_ENV:", process.env.NODE_ENV);
    console.error("- VERCEL:", process.env.VERCEL);
    console.error("- REPLICATE_API_TOKEN exists:", !!process.env.REPLICATE_API_TOKEN);
    
        return Response.json(
          { 
            error: error instanceof Error ? error.message : "Failed to generate image",
            details: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : "No details") : undefined
          } as ErrorResponse,
          { status: 500 }
        );
  }
}