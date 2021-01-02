const BITS = 8;

interface BaseCodingOptions {
  alphabet: string;
}

interface EncodingOptions extends BaseCodingOptions {
  decodedBits: number;
  outputGroups: number;
}

interface DecodingOptions extends BaseCodingOptions {
  encodedBits: number;
}

export namespace Base64 {
  const OUTPUT_GROUPS = 4;
  const BASE64_BITS = 6;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890+/';

  export function encode(toEncode: string): string {
    return BaseCoding.encode(toEncode, { alphabet, decodedBits: BASE64_BITS, outputGroups: OUTPUT_GROUPS });
  }

  export function decode(toDecode: string): string {
    return BaseCoding.decode(toDecode, { alphabet, encodedBits: BASE64_BITS });
  }
}

export namespace Base32 {
  const OUTPUT_GROUPS = 8;
  const BASE32_BITS = 5;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  export function encode(toEncode: string): string {
    return BaseCoding.encode(toEncode, { alphabet, decodedBits: BASE32_BITS, outputGroups: OUTPUT_GROUPS });
  }

  export function decode(toDecode: string): string {
    return BaseCoding.decode(toDecode, { alphabet, encodedBits: BASE32_BITS });
  }
}

export namespace Base16 {
  const OUTPUT_GROUPS = 2;
  const BASE16_BITS = 4;
  const alphabet = '0123456789ABCDEF';

  export function encode(toEncode: string): string {
    return BaseCoding.encode(toEncode, { alphabet, decodedBits: BASE16_BITS, outputGroups: OUTPUT_GROUPS });
  }

  export function decode(toDecode: string): string {
    return BaseCoding.decode(toDecode, { alphabet, encodedBits: BASE16_BITS });
  }
}

class BaseCoding {
  private static readonly padding = '=';

  public static encode(toEncode: string, options: EncodingOptions): string {
    const { alphabet, decodedBits, outputGroups } = options;
    let bytes = '';
    let result = '';
    for (let i = 0; i < toEncode.length; ++i) {
      const charCode = toEncode.charCodeAt(i);
      bytes = bytes.concat(BaseCoding.addLeadingZeros(charCode.toString(2)));
    }
    bytes = BaseCoding.addTrailingZeros(bytes, decodedBits);
    for (let i = 0; i < bytes.length; i += decodedBits) {
      const index = parseInt(bytes.substr(i, decodedBits), 2);
      const char = alphabet.charAt(index);
      result = result.concat(char.toString());
    }
    result = BaseCoding.addPadding(result, outputGroups);
    return result;
  }

  public static decode(toDecode: string, options: DecodingOptions): string {
    const { alphabet, encodedBits } = options;
    const encoded = toDecode.substring(0, toDecode.indexOf(BaseCoding.padding));
    let bytes = '';
    for (let i = 0; i < encoded.length; ++i) {
      const char = encoded.charAt(i);
      const baseByte = BaseCoding.addLeadingZeros(alphabet.indexOf(char).toString(2), encodedBits);
      bytes = bytes.concat(baseByte);
    }
    let decoded = '';
    for (let i = 0; i < bytes.length; i += BITS) {
      const charCode = parseInt(bytes.substr(i, BITS), 2);
      if (charCode === 0) {
        continue;
      }
      if (charCode >= 1 && charCode < 32) {
        throw new Error(`Unknown charakter ${charCode} after ${i} bits.`);
      }
      decoded = decoded.concat(String.fromCharCode(charCode));
    }
    return decoded;
  }

  private static addTrailingZeros(input: string, bits: number): string {
    let result = input;
    while (result.length % bits !== 0) {
      result = result.concat('0');
    }
    return result;
  }

  private static addLeadingZeros(input: string, size: number = BITS): string {
    let result = input;
    while (result.length % size !== 0) {
      result = `0${input}`;
    }
    return result;
  }

  private static addPadding(input: string, size: number): string {
    let result = input;
    while (result.length % size !== 0) {
      result = result.concat(BaseCoding.padding);
    }
    return result;
  }
}
