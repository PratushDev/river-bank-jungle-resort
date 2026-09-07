type MotifProps = {
  className?: string
}

/*
 * Botanical stamps — fine gold line-art laid into quiet corners of the page,
 * like foil blocking on a lodge letterhead. Always aria-hidden, always
 * pointer-events-none; place with absolute positioning and low opacity.
 */

/** A fan of palm ribs — the riverbank's tall grasses and palms */
export function PalmMotif({ className = '' }: MotifProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <path d="M100 190 C100 130 100 90 100 40" />
      <path d="M100 165 C70 140 40 130 14 132" />
      <path d="M100 150 C70 118 46 100 24 92" />
      <path d="M100 135 C78 100 60 76 44 60" />
      <path d="M100 120 C88 84 78 56 72 30" />
      <path d="M100 165 C130 140 160 130 186 132" />
      <path d="M100 150 C130 118 154 100 176 92" />
      <path d="M100 135 C122 100 140 76 156 60" />
      <path d="M100 120 C112 84 122 56 128 30" />
      <path d="M100 40 C98 28 96 18 92 8" />
      <path d="M100 40 C104 28 106 18 110 8" />
    </svg>
  )
}

/** A sal branch — alternating simple leaves on a curved stem */
export function SalBranchMotif({ className = '' }: MotifProps) {
  return (
    <svg
      viewBox="0 0 220 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <path d="M10 150 C60 120 150 90 210 20" />
      <path d="M52 124 C40 106 42 88 56 74 C64 92 64 110 52 124 Z" />
      <path d="M92 104 C74 94 66 78 70 60 C88 68 98 86 92 104 Z" />
      <path d="M128 84 C118 64 122 46 138 34 C146 54 142 72 128 84 Z" />
      <path d="M162 62 C144 56 132 42 132 24 C152 28 164 44 162 62 Z" />
      <path d="M186 42 C180 26 184 12 196 2 C204 18 198 34 186 42 Z" />
    </svg>
  )
}

/** A standing egret — the white sentry of the Rapti's sandbars */
export function EgretMotif({ className = '' }: MotifProps) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      {/* head and bill */}
      <path d="M78 22 C84 18 92 18 104 24" />
      <path d="M78 22 C72 24 68 28 67 34" />
      {/* neck: long S-curve into the body */}
      <path d="M67 34 C66 52 78 60 78 76 C78 92 58 96 50 108" />
      {/* body and folded wing */}
      <path d="M50 108 C38 122 38 140 52 148 C68 156 88 148 92 130 C95 116 88 104 78 98" />
      <path d="M56 140 C68 142 80 138 86 128" />
      {/* legs */}
      <path d="M58 148 C58 162 58 174 56 188" />
      <path d="M70 150 C72 164 72 176 72 188" />
      <path d="M56 188 L48 196 M56 188 L62 196" />
      {/* water line */}
      <path d="M20 196 C36 192 52 196 68 194 C84 192 96 196 108 194" strokeWidth="0.9" />
    </svg>
  )
}
