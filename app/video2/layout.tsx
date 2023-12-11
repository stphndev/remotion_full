import '../globals.css'

export default function Video2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className='display'>{children}</section>
}
