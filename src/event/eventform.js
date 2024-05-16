// title , discription and payment
import { useState, useRef } from 'react';
import './event.css';

const Modal = ({ show, closeModal, submitFn }) => {

    const modalRef = useRef();
    const [data, setData] = useState({
        title: '', payment: 0, description: ''
    })

    const handleClick = (e) => {
        if (!modalRef.current.contains(e.target)) closeModal();
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFn({ ...data });
        setData({
            title: '', estimated_budget: 0, description: ''
        });
        closeModal();
    }

    return (
        <div className="modal" onClick={handleClick} style={{ display: show ? 'flex' : 'none' }}>
            <div className='modalContent' ref={modalRef}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input placeholder='Enter title' onChange={handleChange} name='title'
                            required value={data.title} />
                    </div>
                    <div>
                        <label>Payment</label>
                        <input placeholder='Enter paymet amount' onChange={handleChange} name='payment'
                            type='number' required value={data.payment} />
                    </div>
                    <div>
                        <label>Title</label>
                        <textarea placeholder='Enter a description' onChange={handleChange}
                            name='description' required value={data.description} />
                    </div>
                    <div>
                        <div className='button'>
                            <input className="button_div" type='submit' value='Submit' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;