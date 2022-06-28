  const axios = require('axios')

  const myAction = async () => {
    try {
      const result = await axios.get(`https://imdb-api.com/API/ComingSoon/k_8i9u482p`)

      const { status, data, errorMessage } = result

      // Check if we found movies
      if (status !== 200 || !data || data.items === [] || errorMessage != '') {
        const message = {
          type: 'text',
          text: `Sorry, IMDb seems to have some issues with the UpcomingMovies request. Please try something else.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }
      const message_success = {
        type: 'text',
        text: `These are some upcoming titles`,
        markdown: true
      }
      await bp.events.replyToEvent(event, [message_success])

      // Create a movie card
      for (var i = 0; i < 5; i++) {
        if (data.items[i]) {
          const card = {
            title: data.items[i].fullTitle,
            subtitle: data.items[i].stars,
            image: data.items[i].image
          }
          await bp.events.replyToEvent(event, [card])
        }
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