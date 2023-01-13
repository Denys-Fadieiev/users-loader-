import { Component } from 'react';
import Head from '../Head';
import UserCard from './UserCard';
import styles from './UsersLoader.module.scss';

const inc = ['gender', 'name', 'email', 'login', 'phone', 'id', 'picture'];

class UsersLoader extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
      isLoader: false,
      error: null,
      currentPage: 1,
      results: 6,
    }
  };

  loadUsers = () => {
    const { currentPage, results } = this.state;

    this.setState({isLoader: true});
    fetch(`https://randomuser.me/api?results=${results}&seed=pe2022&inc=${inc}&page=${currentPage}`)
      .then(res => res.json())
      .then(data => this.setState({users: data.results}))
      .catch(e => this.setState({error: e}))
      .finally(() => this.setState({isLoader: false}))
  };

  componentDidMount() {
    this.loadUsers();
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, results } = this.state;

    if(currentPage !==prevState.currentPage){
      this.loadUsers();
    };
    if(results !==prevState.results){
      this.loadUsers();
    };
  };

  prevPage = () => {
    const { currentPage } = this.state;
    
    if(currentPage > 1){
      this.setState({currentPage: currentPage - 1});
    }
  };
  
  nextPage = () => {
    const { currentPage } = this.state;

    this.setState({currentPage: currentPage + 1});
  };

  handleIncrement = () => this.setState({results: this.state.results + 6});

  render() {
    const { users, error, isLoader } = this.state;

    return (
      <div className='wrapper'>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isLoader && <div>Loading. Please waite...</div>}
        {
          !error && !isLoader && (
            <section className={styles.container}>
              <Head
                  prevPage={this.prevPage}
                  nextPage={this.nextPage}
              />
              <ul className={styles.userListWrap}>
                <UserCard 
                  users={users}
                  handleIncrement={this.handleIncrement}
                />
              </ul>
              <button 
                className={styles.btnAddMore}
                onClick={this.handleIncrement}
              >
                ADD MORE
              </button>
            </section>
          )
        }
      </div>
    );
  };
};

export default UsersLoader;