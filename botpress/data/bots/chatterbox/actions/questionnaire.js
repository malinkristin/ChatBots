
  const myAction = async () => {

    const link = {
      type: 'text',
      text: 'https://forms.gle/wRZQ8xRk2Fx2iaaN8',
      markdown: true
    }

    const message = {
      type: 'text',
      text: `Here's the link for the questionnaire ✨`,
      markdown: true
    }
    return await bp.events.replyToEvent(event, [message, link])
  }
  return myAction()