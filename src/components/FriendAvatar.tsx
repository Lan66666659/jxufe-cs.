import { useState } from 'react';

export default function FriendAvatar({
  src,
  name,
  size = 54,
}: {
  src: string;
  name: string;
  size?: number;
}) {
  const [failedSource, setFailedSource] = useState<string>();

  if (!src || failedSource === src) {
    return (
      <span
        className="friend-avatar-fallback"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {name.slice(0, 1)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailedSource(src)}
    />
  );
}
