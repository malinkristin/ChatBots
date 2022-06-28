  const myAction = async () => {
    try {
      const movies = temp.movies

      for (var i = 1; i < 4; i++) {
        const movie = movies[i]
        const card = {
          type: 'card',
          title: movie.title,
          subtitle: movie.description,
          image: movie.image
        }
        await bp.events.replyToEvent(event, [card])

      }
    } catch (err) {
      console.error(err)
      const message = {
        type: 'text',
        text: `I messed up. Could you try again from the start?`,
        markdown: true
      }
      return await bp.events.replyToEvent(event, [message])
    }
  }
  return myAction()