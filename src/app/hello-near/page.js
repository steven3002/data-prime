'use client';
import { EventsContainer } from '@/event/eventList'; // Check the import path
import { useState, useEffect } from 'react';
import { HelloNearContract } from '../../config';
import styles from '../app.module.css';
import { useStore } from '../layout';
import Modal from '@/event/eventform';

// Contract that the app will interact with
const CONTRACT = HelloNearContract;

export default function HelloNear() {
  const { signedAccountId, wallet } = useStore();
  const [greeting, setGreeting] = useState('loading...');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showForm, setShowForm] = useState(false); // Define showForm state

  useEffect(() => {
    if (!wallet) return;

    wallet.viewMethod({ contractId: CONTRACT, method: 'list_events' })
      .then(greeting => setGreeting(greeting));
  }, [wallet]);

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);





  const handleVoteButtonClick = async (eventId) => {
    setShowSpinner(true);
    await wallet.callMethod({ contractId: CONTRACT, method: 'add_vote', args: { id: eventId } });
    const eventList = await wallet.viewMethod({ contractId: CONTRACT, method: 'list_events' });
    setGreeting(eventList);
    setShowSpinner(false); // Change to false to hide the spinner after updating the event list
  };

  const handleFormButtonClick = () => {
    setShowForm(true);
  };
  const submitFn = async (data) => {
    console.log(data);
    console.log(data.description)
    console.log(data.title)
    setShowSpinner(true);
    await wallet.callMethod({

      contractId: CONTRACT, method: 'add_event', args: {
        "estimated_budget": 0,
        "description": data.description,
        "title": data.title
      }
    });
    const eventList = await wallet.viewMethod({ contractId: CONTRACT, method: 'list_events' });
    setGreeting(eventList);
    setShowSpinner(false); // Change to false to hide the spinner after updating the event list

  }



  return (
    <>


      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Interacting with the contract: &nbsp;
            <code className={styles.code}>{CONTRACT}</code>
          </p>
        </div>
      </main>
      <EventsContainer eventsData={greeting} onVoteButtonClick={handleVoteButtonClick} onFormButtonClick={handleFormButtonClick} />
      <Modal show={showForm} closeModal={() => setShowForm(false)} submitFn={submitFn} />

    </>
  );
}
