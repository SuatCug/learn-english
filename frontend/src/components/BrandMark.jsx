import logo from '@/assets/logo.png';

// Site logosu (src/assets/logo.png, 128x128). Favicon için public/favicon.png ve
// public/apple-touch-icon.png aynı görselin küçültülmüş halleridir.
export default function BrandMark({ size = 32 }) {
  return (
    <img
      src={logo}
      alt=""
      width={size}
      height={size}
      className="rounded-lg shrink-0"
      style={{ width: size, height: size }}
    />
  );
}
