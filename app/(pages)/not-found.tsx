import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
  return (
    <div>
        <h2>Not Found Page</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href={"/"}>Return to the homepage</Link>
    </div>
  )
}
