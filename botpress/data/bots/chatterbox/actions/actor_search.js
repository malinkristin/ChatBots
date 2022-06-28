  const axios = require('axios')

  const myAction = async params => {
    try {
      const result = await axios.get(`https://imdb-api.com/API/SearchAll/k_8i9u482p/${params.name}`)
      console.log(`https://imdb-api.com/API/Name/k_8i9u482p/${params.name}`)

      const { status, data } = result

      // Check if we found movies
      if (status !== 200 || !data || !data.results[0]) {
        const message = {
          type: 'text',
          text: `Sorry, I couldn't find anyone with that name.`,
          markdown: true
        }
        return await bp.events.replyToEvent(event, [message])
      }

      const actorId = data.results[0].id

      const actorResult = await axios.get(`https://imdb-api.com/API/Name/k_8i9u482p/${actorId}`)

      const card = {
        type: 'card',
        title: `${actorResult.data.name}`,
        image: `${actorResult.data.image}`
      }
      await bp.events.replyToEvent(event, [card])
      const message_knownFor = {
        type: 'text',
        text: `They are known for the following titles`,
        markdown: true
      }
      await bp.events.replyToEvent(event, [message_knownFor])

      // Create a movie card
      for (var i = 0; i < 3; i++) {
        if (actorResult.data.knownFor[i]) {
          const card = {
            type: 'card',
            title: actorResult.data.knownFor[i].fullTitle,
            subtitle: actorResult.data.knownFor[i].year,
            image: `${actorResult.data.knownFor[i].image}`
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
  return myAction(args)