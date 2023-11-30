import '../globals.css'

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className='display'>{children}</section>
}
