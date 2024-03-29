import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery , useMutation} from '@tanstack/react-query';
import { updateAnEvent } from '../../util/http.jsx';
import { queryClient } from '../../App.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const {data} = useQuery({
    queryKey:['individual-event', {id: params.id}],
    queryFn: ({signal})=>fetchIndividualEvent({signal, id: params.id}),
  })

  const {mutate} = useMutation({
    mutationFn: updateAnEvent,
    onSuccess: ()=>{
      queryClient.invalidateQueries({});
      navigate(`/events/${params.id}`);
    },
  })

  function handleSubmit(formData) {
    mutate({id: params.id, event: formData})

  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
