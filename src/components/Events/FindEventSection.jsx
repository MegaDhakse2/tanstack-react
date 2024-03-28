import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  // console.log("find event section rendering")

  // const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const {isPending,isLoading, isError, error, data} = useQuery({
    queryKey: ['events', {search: searchTerm}],
    queryFn: ({signal})=>fetchEvents({signal, searchTerm}),
    enabled: searchTerm !== undefined
  });

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log("handle submitt calling")
  //   setSearchTerm(searchElement.current.value);
  // }
  function handleOnChange(event){
    setSearchTerm(event.target.value);
  }

  let content;
  if (isLoading) {
    content = (
      <LoadingIndicator/>
    )
  }

  if (isError) {
    // {console.log(error)}
    content = (
      <ErrorBlock title='An Error Occurred' message={error.info?.message || 'Failed to Fetch Events'}/>
    )
  }

  if (data) {
      // {console.log(data)}
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        {/* <form onSubmit={handleSubmit} id="search-form"> */}
        <form id="search-form">
          <input
            type="search"
            placeholder="Search events"
            // ref={searchElement}
            defaultValue={searchTerm}
            onChange={handleOnChange}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
