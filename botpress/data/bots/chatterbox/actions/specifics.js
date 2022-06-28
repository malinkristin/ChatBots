  const specifics = async () => {
    // Prepare the message
    const message = {
      type: 'text',
      text: `Here's what I found: ${temp.results.title}`,
      // Markdown enables rich content, for example links or bold text. Otherwise, content will be displayed as-is
      markdown: true
    }

    // Send the message to the user (note the array, since you can send multiple payloads in the same reply)
    await bp.events.replyToEvent(event, [message])
  }

  return specifics()