import React, { useEffect, useRef, useState } from 'react';
import {Initializer, ObjectProxy, ArrayProxy, AlertDialog} from 'duice';

const styles = {
  main: {
    padding: '2rem',
    display: 'grid',
    gridTemplateAreas: `
      'title title'
      'master detail'
    `,
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    gap: '1rem',
  },
  title: {
    gridArea: 'title',
  },
  master: {
    gridArea: 'master',
  },
  detail: {
    gridArea: 'detail',
  },
};

function MasterDetail() {
  // defines
  const userSearch = new ObjectProxy({
    key: null,
    value: null,
    groupId: null,
    active: null,
    _size: 20,
    _page: 0,
    _status: null
  });
  const users = new ArrayProxy([]);
  const user = new ObjectProxy({});

  /**
   * get users
   * @param {*} event  event
   * @param {*} page  page
   */
  const getUsers = (event, page) => {
    event && event.preventDefault();
    userSearch._page = page || 0;
    let url = new URL(`${process.env.REACT_APP_API_URL??''}/api/users`, document.location.href);
    if (userSearch.key && userSearch.value) {
      url.searchParams.append(userSearch.key, userSearch.value);
    }
    if (userSearch.groupId) {
        url.searchParams.append('groupId', userSearch.groupId);
    }
    if (userSearch.active) {
        url.searchParams.append('active', userSearch.active);
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
        ArrayProxy.assign(users, data);
    }).catch(e => {
        new AlertDialog(e).open();
    }).finally(() => {
        userSearch._status = 'completed';
    });
  };

  const resetUsers = (event) => {
    event.preventDefault();
    ObjectProxy.reset(userSearch);
    getUsers();
  };

  const getUser = (id) => {
    let url = new URL(`${process.env.REACT_APP_API_URL??''}/api/users/${id}`, document.location.href);
    fetch(url)
    .then(response => response.json())
    .then(data => {
      ObjectProxy.assign(user, data);
    });
  };

  const saveUser = (event) => {
    event.preventDefault();
    console.log("saveUser", user);
  };

  // initialize duice
  const container = useRef(null);
  useEffect(() => {
    Initializer.initialize(container.current, {
      userSearch: userSearch,
      users: users,
      user: user,
      getUser: getUser
    });
    getUsers();
  },[]);

  // template
  return ( 
    <main ref={container} style={styles.main}>
      <div style={styles.title}>
        <h1>Master Detail Pattern</h1>
      </div>
      <div style={styles.master}>
        <h2>
          Master
        </h2>
        <div className="display--flex flex-direction--column">
          <form onSubmit={getUsers} className="display--flex justify-content--spacebetween gap--1px">
            <input type="text" data-duice-bind="userSearch" data-duice-property="value"/> 
            <label>
                <select className="width--100"
                        data-duice-bind="userSearch"
                        data-duice-property="groupId">
                    <option value="">Group...</option>
                    <option value="human">Human</option>
                    <option value="animal">Animal</option>
                    <option value="plant">Plant</option>
                </select>
            </label>
            <div>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
                Search
              </button>
              <button type="button" onClick={resetUsers}>
                <i className="fa-solid fa-rotate-right"></i>
                Reset
              </button>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <td>Name</td>
              </tr>
            </thead>
            <tbody>
              <tr data-duice-bind="users" 
                  data-duice-loop="user,status"
                  data-duice-execute="
                  this.dataset.id=user.id; 
                  this.addEventListener('click', () => {
                    getUser(this.dataset.id);
                  });
                  ">
                <td>
                  <span data-duice-bind="user" data-duice-property="name"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={styles.detail}>
        <h2>
          <i className="fa-solid fa-envelope-open-text"></i>
          Detail
        </h2>
        <div className="display--flex flex-direction--column grap--1px">
          <form onSubmit={saveUser} className="display--grid grid-template-columns--2fr row-gap--1rem column-gap--2rem border-style--solid border-width--1px padding--1rem">
            <label className="grid-column--span-1 display--flex flex-direction--column">
              <span>Name</span>
              <input type="text"
                     data-duice-bind="user"
                     data-duice-property="name"/>
            </label>
            <div className="grid-column--span-2 justify-self--end">
              <button type="button"
                      data-duice-bind="user"
                      data-duice-execute="Object.keys(user).length < 1 ? this.disabled=true: this.disabled=false;">
                <i className="fa-regular fa-trash-can"></i>
                Delete
              </button>
              <button type="submit" 
                data-duice-bind="user"
                data-duice-execute="Object.keys(user).length < 1 ? this.disabled=true: this.disabled=false;">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default MasterDetail;

