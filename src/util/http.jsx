import { QueryClient } from "@tanstack/react-query";


export async function fetchEvents({signal, searchTerm, max}) {
    // console.log(searchTerm)
    let url = 'http://localhost:3000/events';

    if (searchTerm && max){
        url += `?search=${searchTerm}&max=${max}`
    }else if (searchTerm) {
        url += '?search=' + searchTerm;
    }  else if (max){
        url += '?max='+ max
    }


    const response = await fetch(url, {signal:signal});

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const { events } = await response.json();

    return events;
  }

  export async function fetchEventsViaRouteLoader(searchTerm) {
    // console.log(searchTerm)
    let url = 'http://localhost:3000/events';

    if (searchTerm) {
        url += '?search=' + searchTerm;
    }

    const response = await fetch(url);

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const { events } = await response.json();

    return events;
  }

export async function uploadAnEvent(eventData){
    const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = new Error('An error occurred on uploading the data. Try Again');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const {resMessage} = await response.json();
    return resMessage;
}

export async function updateAnEvent({id, event}){
    console.log('updateAnEvent is calling....')
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({event}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = new Error('An error occurred on updating the data. Try Again');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const {resMessage} = await response.json();
    return resMessage;
}


export async function fetchSelectableImages({signal}){
    const response = await fetch('http://localhost:3000/events/images', {signal})

    if (!response.ok) {
        const error = new Error('Unable to fetch images')
        error.status = response.status;
        error.info = await response.json();
        throw error;
    }

    const {images} = await response.json();
    // console.log(images)
    return images;
}

export async function fetchIndividualEvent({id, signal}){
    const response = await fetch(`http://localhost:3000/events/${id}`, {signal});

    if (!response.ok) {
        const error = new Error('Unable to fetch Event')
        error.status = response.status;
        error.info = await response.json();
        throw error;
    }

    const {event} = await response.json();
    // console.log(event, "This is from fetchIndividualEvent")
    return event;
}

export async function deleteIndividualEvent({id}){
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        const error = new Error('Unable to Delete Event')
        error.status = response.status;
        error.info = await response.json();
        throw error;
    }

   return await response.json();
   
}