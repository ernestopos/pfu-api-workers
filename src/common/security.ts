export class Security{
    public static RESEND_API_KEY : String = "re_GfMXGiZy_FfpJp57iWMc3keCTybWrbxpf";
    public static EMAIL_FROM : String = "pfu.info@peerkals.com";
    public static EMAIL_PASS : String = "Asoquip68mnb.";
    public static SECRET_KEY_TEST : String = "test_integrity_iK5HB66h7QJYGE1jmQhwVF9sRh41dQSb";
    public static SECRET_KEY : String = "prod_integrity_WQS9cqLj31Fgz9WcT4iP072H6Vbu7ykA";
}

export async function generateUIIDD() {
  const seg1 = Math.random().toString(16).substring(2, 8);
  const seg2 = crypto.randomUUID().split('-')[1] + crypto.randomUUID().split('-')[2];
  const seg3 = Date.now().toString(36);
  return `${seg1}-${seg2}-${seg3}`;  
}

export async function hashSHA256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}