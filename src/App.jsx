/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  { id: 1, name: 'Jack', phone: 88885555, email: 'jack@example.com', bookingTime: new Date() },
  { id: 2, name: 'Rose', phone: 88884444, email: 'rose@example.com', bookingTime: new Date() },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { id, name, phone, email, bookingTime } = props.traveller;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    {/* Render one row of the table with traveller attribute values */}
    <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {/*map the travellers array to create a table row for each traveller*/}
        {props.travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const id = this.props.travellers.length + 1;
    if (id > 10) {
      alert("All seats are occupied!");
      return; // Stop form submission if validation fails
    }
    const name = form.travellername.value;
    const email = form.travelleremail.value;
    const bookingTime = new Date();
    const phoneNumber = form.travellerphone.value;
    if (!/^\d{8}$/.test(phoneNumber)) {
      alert("Phone number must be exactly 8 digits!");
      return; // Stop form submission if validation fails
    }
    
    const newTraveller = {
      id: id,
      name: name,
      phone: phoneNumber,
      email: email,
      bookingTime: bookingTime,
    };
    this.props.bookTraveller(newTraveller);
    form.reset();
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required />
        <input type="text" name="travellerphone" placeholder="Phone" required />
        <input type="email" name="travelleremail" placeholder="Email" required />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const passenger = {
      name: form.travellername.value,
    };
    this.props.deleteTraveller(passenger);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required/>
        <button>Delete</button>
      </form>
    );
  }
}

function DisplaySeats({ travellers, totalSeats }) {
  const occupiedSeats = travellers.length;
  const seatButtons = [];

  // Generate seat buttons based on total number of seats
  for (let i = 1; i <= totalSeats; i++) {
    const isOccupied = i <= occupiedSeats;
    seatButtons.push(
      <button
        key={i}
        className={`seat ${isOccupied ? 'occupied' : 'free'}`}
      >
        {isOccupied ? 'Occupied' : 'Free'}
      </button>
    );
  }

  return (
    <div className="seating-container">
      <div className="seating-grid">
        {seatButtons}
      </div>
    </div>
  );
}

function DisplayFreeSeats({ freeSeats, totalSeats }) {
  return (
    <div>
      <h3>Available Seats: {freeSeats}/{totalSeats}</h3>
    </div>
  );
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    const totalSeats = 10; // Total number of seats available
    const { travellers } = this.props;
    const occupiedSeats = travellers.length;
    const freeSeats = totalSeats - occupiedSeats; // Calculate free seats
	return (
	<div id='Home'>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    {/* Integrating DisplayFreeSeats sub-component */}
    <h2>🚀 Welcome to TicketToRide! 🚀</h2>
    <p> </p>
    <DisplayFreeSeats freeSeats={freeSeats} totalSeats={totalSeats} />
    <DisplaySeats travellers={travellers} totalSeats={totalSeats} />
	</div>);
	}
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1, emptySeats: 10};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
  	this.setState({selector: value});
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    this.setState((prevState) => {
      const travellers = [...prevState.travellers, passenger];
      alert(`Passenger ${passenger.name} has been added!`);
      return { travellers };
    });
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prevState) => {
      // Filter out the traveller that matches the passenger's name
      const updatedTravellers = prevState.travellers.filter(
        (traveller) => traveller.name.toLowerCase() !== passenger.name.toLowerCase()
      );

      // If the length of the updatedTravellers is the same as the original, no traveller was removed
      if (updatedTravellers.length === prevState.travellers.length) {
        alert(`Passenger ${passenger.name} not found!`);
        return null; // no state update needed
      }

      // Reset the id values to be sequential
      const travellersWithUpdatedIds = updatedTravellers.map((traveller, index) => ({
        ...traveller,
        id: index + 1 // Reassign id to be the index + 1
      }));

      // Show alert after updating state
      alert(`Passenger ${passenger.name} has been deleted!`);
  
      //Return the new state object with the updated travellers
      return { travellers: travellersWithUpdatedIds };
    });
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div id='navigation'>
           {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button onClick={() => this.setSelector(1)}>Homepage</button>
          <button onClick={() => this.setSelector(2)}>Add Traveller</button>
          <button onClick={() => this.setSelector(3)}>Display Travellers</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
        </div>
        <div id='container'>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 1 && <Homepage travellers={this.state.travellers} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 3 && (
            <>
              <h2>Display Travellers</h2>
              <Display travellers={this.state.travellers} />
            </>
          )}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 2 && (
            <>
              <h2>Add Traveller</h2>
              <Add bookTraveller={this.bookTraveller} travellers={this.state.travellers} />
            </>
          )}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 4 && (
            <>
              <h2>Delete Traveller</h2>
              <Delete deleteTraveller={this.deleteTraveller} />
            </>
          )}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
