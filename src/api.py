def modInverse(a, mod):
    for i in range(mod-1):
        if (i+1)*a % mod == 1:
            return i+1
    return 0

class AffineCipher:
    @staticmethod
    def encrypt(plaintext, key, alphabet='abcdefghijklmnopqrstuvwxyz'):
        if modInverse(key["a"], len(alphabet)) == 0:
            raise Exception(f"key.a ({key['a']}) does not have inverse")
        repKey = {alphabet[i]: alphabet[(i * key["a"] + key["b"]) % len(alphabet)] for i in range(len(alphabet))}
        ciphertext = ''.join([repKey[l] for l in plaintext])
        return ciphertext
    
    @staticmethod
    def decrypt(ciphertext, key, alphabet='abcdefghijklmnopqrstuvwxyz'):
        inv = modInverse(key["a"], len(alphabet))
        if inv == 0:
            raise Exception(f"key.a ({key['a']}) does not have inverse")
        repKey = {alphabet[i]: alphabet[(i - key["b"]) * inv % len(alphabet)] for i in range(len(alphabet))}
        plaintext = ''.join([repKey[l] for l in ciphertext])
        return plaintext

def call(alphabet, a, b, text, action):
    if action == "encrypt":
        return {
            "text": AffineCipher.encrypt(text, {"a": int(a), "b": int(b)}, alphabet)
        }
    else:
         return {
            "text": AffineCipher.decrypt(text, {"a": int(a), "b": int(b)}, alphabet)
        }       