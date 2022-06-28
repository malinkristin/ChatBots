
  const axios = require('axios')
  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} name - An example string variable
   * @param {any} value - Another Example value
   */
  const myAction = async () => {
    try {
      const result = await axios.get(`https://imdb-api.com/API/MostPopularMovies/k_8i9u482p`)

      const { status, data } = result

      // Check if we found movies
      if (status !== 200 || !data) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn't find any popular movies.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }

      const message_success = {
          type: 'text',
          text: `These are some popular titles`,
          markdown: true
      }

      await bp.events.replyToEvent(event, [message_success])

      // Create a movie card
      for (var i = 0; i < 5; i++) {
        const card = {
          type: 'card',
          title: data.items[i].fullTitle,
          subtitle: `Rated by imDb: ${data.items[i].imDbRating}`,
          image: `${data.items[i].image}`
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