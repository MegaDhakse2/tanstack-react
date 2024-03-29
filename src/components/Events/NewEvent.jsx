import { Link, redirect, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { uploadAnEvent } from '../../util/http.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../App.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  const {mutate, isPending, isError, error } = useMutation({
    mutationFn: uploadAnEvent,

    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['eventsData']})
      navigate('/events')
    },
  })

  function handleSubmit(formData) {
    mutate({event: formData});
  }

  return (
    <>
      <Modal onClose={() => navigate('../')}>
        {isPending && <LoadingIndicator/>}
        {isError && <ErrorBlock title={"An Error Occurred"} message={error.info?.message || "Unable to upload event"}/>}
        {!isPending && 
            (
              <EventForm onSubmit={handleSubmit}>
                <>
                  <Link to="../" className="button-text">
                    Cancel
                  </Link>
                  <button type="submit" className="button">
                    Create
                  </button>
                </>
              </EventForm>
            )
        }
      </Modal>
    </>
  );
}
