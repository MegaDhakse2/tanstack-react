import { Link, Outlet, useNavigate, useParams} from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteIndividualEvent, fetchIndividualEvent } from '../../util/http.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../App.jsx';

export default function EventDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const {isPending, data, isError, error} = useQuery({
    queryKey:['individual-event', {id: params.id}],
    queryFn: ({signal})=>fetchIndividualEvent({signal, id: params.id}),
  })

  const {mutate} = useMutation({
    mutationFn: deleteIndividualEvent,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['events']})
      navigate('/events')
    },
  })

  function deleteEvent(){
    window.confirm('Are You Sure?');
    mutate({id: params.id})
  }
  let content;

  if (isPending) {
    content = <LoadingIndicator/>
  }

  if (isError) {
    content = <ErrorBlock title={'An Error While fetching the Event'} message={error.info?.message}/>
  }

  if (data) {
    content = <article id="event-details">
      <header>
        <h1>{data.title}</h1>
        <nav>
          <button onClick={deleteEvent}>Delete</button>
          <Link to="edit">Edit</Link>
        </nav>
      </header>
      <div id="event-details-content">
        <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
        <div id="event-details-info">
          <div>
            <p id="event-details-location">Location</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
          </div>
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
    </article>
  }
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {content}
    </>
  );
}
