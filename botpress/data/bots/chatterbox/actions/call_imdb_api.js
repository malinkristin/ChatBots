  const axios = require('axios')

  const myAction = async params => {
    try {
      const result = await axios.get(`https://imdb-api.com/API/SearchTitle/k_8i9u482p/${params.title}`)

      const { status, data } = result

      // Check if we found movies
      if (status !== 200 || !data || !data.results[0]) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn't find a title with that name.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }

      // Get first result
      const firstMatch = data.results[0]

      const card = {
        type: 'card',
        title: firstMatch.title,
        subtitle: firstMatch.description,
        image: firstMatch.image
      }
      await bp.events.replyToEvent(event, [card])

      const message = {
        type: 'text',
        text: `Is it the one you were looking for?`,
        markdown: true
      }
      await bp.events.replyToEvent(event, [message])

      temp.movies = data.results
      console.log(temp.movies)
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
  return myAction(args)