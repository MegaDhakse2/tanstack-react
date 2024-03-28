import { useEffect, useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import {fetchEvents} from '../../util/http.jsx';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

export default function NewEventsSection() {
  // const eventsData = useLoaderData();
  console.log("rendered from NewEventsSection component");

  const {isLoading, error, data} = useQuery({
    queryKey:['eventsData'],
    queryFn: fetchEvents,
    // staleTime: 10000,
    // gcTime: 2000 
  }); 

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock title="An error occurred" message="Failed to fetch events" />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
