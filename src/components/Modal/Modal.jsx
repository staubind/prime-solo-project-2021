import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

// adapted from Bootstrap-react's modal.
function ServingsModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>How many servings would you like to add?</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
          {/* add input for servings */}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={() => {
            props.confirm()
            props.onHide()
        }}>Confirm
        </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ServingsModal;