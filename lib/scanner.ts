let wasmInstance: WebAssembly.Instance | null = null;

export async function scanBinary(data: Uint8Array): Promise<{ matches: Array<{ pattern: string; offset: number }> }> {
  if (!wasmInstance) {
    try {
      const result = await WebAssembly.instantiateStreaming(
        fetch('/wasm/binary_scanner_bg.wasm'),
        {
          env: {
            memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
          },
        }
      );
      wasmInstance = result.instance;
    } catch (error) {
      console.error('Failed to load WebAssembly module:', error);
      throw new Error('Failed to initialize scanner');
    }
  }

  try {
    const { memory, scan_binary, malloc, free } = wasmInstance.exports as any;

    const inputPtr = malloc(data.length);
    new Uint8Array(memory.buffer).set(data, inputPtr);

    const resultPtr = scan_binary(inputPtr, data.length);
    const result = new TextDecoder().decode(new Uint8Array(memory.buffer, resultPtr));

    free(inputPtr);

    return JSON.parse(result) as { matches: Array<{ pattern: string; offset: number }> };
  } catch (error) {
    console.error('Error during scanning:', error);
    throw new Error('Failed to scan binary');
  }
}

