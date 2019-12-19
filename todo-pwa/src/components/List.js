import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import logo from '../logo.svg';
const ITEMS_URL = 'https://pwa-demo-walmart.herokuapp.com/items.json';

export default class List extends Component {
  state = {
    items: [],
    loading: true,
    todoItem: '',
    offline: !navigator.onLine
  };

  componentDidMount() {
    // fetch(ITEMS_URL)
    //   .then((response) => response.json())
    //   .then((items) => {
    //     this.setState({ items, loading: false });
    //   });

    axios.get(ITEMS_URL).then((items) => {
      this.setState({ items: items.data, loading: false });
    });

    window.addEventListener('online', this.setOfflineStatus);
    window.addEventListener('offline', this.setOfflineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.setOfflineStatus);
    window.removeEventListener('offline', this.setOfflineStatus);
  }

  setOfflineStatus = () => {
    this.setState({ offline: !navigator.onLine });
  };

  addItem = (e) => {
    e.preventDefault();

    fetch(ITEMS_URL, {
      method: 'POST',
      body: JSON.stringify({ item: this.state.todoItem }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((items) => {
        if (items.error) {
          alert(items.error);
        } else {
          this.setState({ items });
        }
      });

    this.setState({ todoItem: '' });
  };

  deleteItem = (itemId) => {
    fetch(ITEMS_URL, {
      method: 'DELETE',
      body: JSON.stringify({ id: itemId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((items) => {
        if (items.error) {
          alert(items.error);
        } else {
          this.setState({ items });
        }
      });
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <img src={logo} alt="logo" />
            My Todo List
          </span>
          {this.state.offline && <span className="badge badge-danger my-3">Offline</span>}
          <span>
            <Link to="/profile">Profile</Link>
          </span>
        </nav>

        <div className="px-3 py-2">
          <form className="form-inline my-3" onSubmit={this.addItem}>
            <div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
              <input
                className="form-control col-12"
                placeholder="What do you need to do?"
                value={this.state.todoItem}
                onChange={(e) =>
                  this.setState({
                    todoItem: e.target.value
                  })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2 col-4 col-sm-2">
              Add
            </button>
          </form>

          {this.state.loading && <p>Loading...</p>}

          {!this.state.loading && this.state.items.length === 0 && (
            <div className="alert alert-secondary">No items - all done!</div>
          )}

          {!this.state.loading && this.state.items && (
            <table className="table table-striped">
              <tbody>
                {this.state.items.map((item, i) => {
                  return (
                    <tr key={item.id} className="row">
                      <td className="col-1">{i + 1}</td>
                      <td className="col-10">{item.item}</td>
                      <td className="col-1">
                        <button
                          type="button"
                          className="close"
                          aria-label="Close"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}