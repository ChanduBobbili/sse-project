import { useEffect, useRef, useState } from 'react'

const useSSE = (url: string) => {
  // State to store the latest data received from the SSE
  const [data, setData] = useState(null)
  // State to store any error that occurs during the SSE connection
  const [error, setError] = useState<Error | null>(null)
  // State to indicate if the connection is currently loading/establishing
  const [loading, setLoading] = useState(true)

  // useRef to keep track of the EventSource instance.
  // This helps in cleaning up the connection when the component unmounts
  // or the URL changes.
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    // Clear any previous error and reset data when the URL changes or on initial mount
    setError(null)
    setData(null)
    setLoading(true)

    // Check if EventSource is supported by the browser
    if (!window.EventSource) {
      setError(new Error('EventSource is not supported in this browser.'))
      setLoading(false)
      console.error('EventSource is not supported.')
      return
    }

    try {
      // Create a new EventSource instance with the provided URL
      eventSourceRef.current = new EventSource(url)

      // Event listener for when the connection is successfully opened
      eventSourceRef.current.onopen = () => {
        console.log('SSE connection opened.')
        setLoading(false) // Connection is established, so no longer loading
      }

      // Event listener for incoming messages from the SSE endpoint
      eventSourceRef.current.onmessage = (event) => {
        console.log('Received message:', event.data)
        try {
          // Attempt to parse the data as JSON. If it's not JSON, store it as plain text.
          setData(JSON.parse(event.data))
        } catch (e) {
          setData(event.data)
        }
      }

      // Event listener for any errors that occur during the SSE connection
      eventSourceRef.current.onerror = (err) => {
        console.error('SSE error:', err)
        setError(err as unknown as Error) // Set the error state
        setLoading(false) // Stop loading on error
        // Close the connection on error to prevent continuous retries if the error is persistent
        if (eventSourceRef.current) {
          eventSourceRef.current.close()
        }
      }

      // Cleanup function: This runs when the component unmounts or
      // when the dependencies (url) change. It closes the SSE connection.
      return () => {
        if (eventSourceRef.current) {
          console.log('Closing SSE connection.')
          eventSourceRef.current.close()
          eventSourceRef.current = null
        }
      }
    } catch (e) {
      // Catch any synchronous errors during EventSource instantiation
      console.error('Failed to create EventSource:', e)
      setError(e as Error)
      setLoading(false)
    }
  }, [url]) // Re-run the effect if the URL changes

  // Return the data, error, and loading state for the component using the hook
  return { data, error, loading }
}

export default useSSE
