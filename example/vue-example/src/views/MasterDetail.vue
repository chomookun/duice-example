<template>
    <main ref="container">
      <div id="title">
        <h1>Master Detail Pattern</h1>
      </div>
      <div id="master">
        <h2>
          <i class="fa-solid fa-list"></i>
          Master
        </h2>
        <div class="display--flext flex-direction--column gap--1px">
          <form onsubmit="return false;" class="display--flex justify-content--space-between gap--1px">
              <div class="display--flex gap--1rem">
                  <span class="display--flex gap--1px">
                      <label>
                          <select data-duice-bind="userSearch"
                                  data-duice-property="key">
                              <option value="" selected>Search...</option>
                              <option value="name">Name</option>
                              <option value="email">Email</option>
                          </select>
                      </label>
                      <label>
                          <input type="text"
                                  data-duice-bind="userSearch"
                                  data-duice-property="value"
                                  data-duice-execute="if (!userSearch.key) this.disabled=true;"
                                  placeholder="Keyword">
                      </label>
                  </span>
                  <label>
                      <select class="width--100"
                              data-duice-bind="userSearch"
                              data-duice-property="groupId">
                          <option value="" selected>Group...</option>
                          <option value="human">Human</option>
                          <option value="animal">Animal</option>
                          <option value="plant">Plant</option>
                      </select>
                  </label>
                  <label>
                      <input type="checkbox"
                              data-duice-bind="userSearch"
                              data-duice-property="active"/>
                      <span>Active</span>
                  </label>
              </div>
              <div>
                  <button type="submit" @click="getUsers" class="btn btn-primary">
                      <i class="fa-solid fa-magnifying-glass"></i>
                      Search
                  </button>
                  <button type="button" @click="resetUsers" class="btn btn-secondary">
                      <i class="fa-solid fa-rotate-right"></i>
                      Reset
                  </button>
              </div>
          </form>
          <table class="width--100">
            <colgroup>
              <col style="width:5rem;"/>
              <col span="2"/>
              <col style="width:10rem;"/>
              <col style="width:8rem;"/>
              <col style="width:5rem;"/>
            </colgroup>
            <thead>
            <tr>
              <th class="text-align--center">No</th>
              <th>Name</th>
              <th>Email</th>
              <th>SocialNo</th>
              <th>Group</th>
              <th class="text-align--center">Active</th>
            </tr>
            </thead>
            <tbody>
            <tr data-duice-bind="users"
                data-duice-loop="user,status"
                data-duice-selected-item-class="selected"
                data-duice-execute="this.dataset.id=user.id;
                this.addEventListener('click', () => {
                  getUser(this.dataset.id);
                });"
                class="cursor--pointer">
              <td class="text-align--center">
                        <span data-duice-bind="user"
                              data-duice-execute="
                              this.innerHTML=userSearch._size*userSearch._page+status.count;
                              ">
                        </span>
              </td>
              <td>
                <img src="/static/image/icon-image.png" alt="" class="height--1rem"
                     data-duice-bind="user"
                     data-duice-property="photo"/>
                <span data-duice-bind="user"
                      data-duice-property="name"></span>
              </td>
              <td data-duice-bind="user"
                  data-duice-property="email">
              </td>
              <td class="text-align--center"
                  data-duice-bind="user"
                  data-duice-property="socialNo"
                  data-duice-format="string('###-##-####')">
              </td>
              <td>
                <label>
                  <select class="width--100"
                          data-duice-bind="user"
                          data-duice-property="groupId">
                    <option selected disabled></option>
                    <option value="human">Human</option>
                    <option value="animal">Animal</option>
                    <option value="plant">Plant</option>
                  </select>
                </label>
              </td>
              <td class="text-align--center">
                <label>
                  <input type="checkbox"
                         data-duice-bind="user"
                         data-duice-property="active"/>
                </label>
              </td>
            </tr>
            <tr hidden
                data-duice-bind="userSearch"
                data-duice-if="return userSearch._status === 'loading';">
              <td colspan="100%" class="text-align--center">
                            <span class="animate__animated animate__flash">
                                Loading...
                            </span>
              </td>
            </tr>
            <tr hidden
                data-duice-bind="userSearch"
                data-duice-if="return userSearch._status === 'completed' && users.length < 1;">
              <td colspan="100%" class="text-align--center">
                           <span>
                               Data Not Found
                           </span>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="display--flex justify-content--space-between margin-top--1rem">
            <div></div>
            <div>
              <button type="button" onclick="getUsers(userSearch._page-1);"
                      data-duice-bind="users"
                      data-duice-execute="userSearch._page < 1 ? this.disabled=true : this.disabled=false;">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <span data-duice-bind="userSearch" data-duice-property="_page" class="padding--1rem"></span>
              <button type="button" onclick="getUsers(userSearch._page+1);"
                      data-duice-bind="users"
                      data-duice-execute="users.length < userSearch._size ? this.disabled=true : this.disabled=false;">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div>
              <button type="button" onclick="createUser();" class="btn btn-secondary">
                <i class="fa-solid fa-plus"></i>
                New
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="detail">
        <h2>
          <i class="fa-solid fa-envelope-open-text"></i>
          Detail
        </h2>
        <div class="display--flex flex-direction--column grap--1px">
          <form onsubmit="return false;" class="display--grid grid-template-columns--2fr row-gap--1rem column-gap--2rem border-style--solid border-width--1px padding--1rem">
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>Name</span>
              <input type="text"
                     data-duice-bind="user"
                     data-duice-property="name">
            </label>
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>Password</span>
              <input type="password"
                     data-duice-bind="user"
                     data-duice-property="password">
            </label>
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>Email</span>
              <input type="email"
                     data-duice-bind="user"
                     data-duice-property="email">
            </label>
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>SocialNo</span>
              <input type="text"
                     data-duice-bind="user"
                     data-duice-property="socialNo" data-duice-format="string('###-##-####')">
            </label>
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>Group</span>
              <select class="form-select"
                      data-duice-bind="user"
                      data-duice-property="groupId">
                <option selected>Group...</option>
                <option value="human">Human</option>
                <option value="animal">Animal</option>
                <option value="plant">Plant</option>
              </select>
            </label>
            <div class="grid-column--span-1 align-self--end">
              <label>
                <input type="checkbox" class="form-checkbox-input"
                       data-duice-bind="user"
                       data-duice-property="active">
                <span>Active</span>
              </label>
            </div>
            <div class="grid-column--span-2 display--flex flex-direction--column">
              <label>
                <span>Photo</span><br/>
                <img src="/static/image/icon-image.png" alt="" class="icon--64"
                     data-duice-bind="user"
                     data-duice-property="photo"
                     data-duice-editable="true"/>
              </label>
            </div>
            <label class="grid-column--span-2 display--flex flex-direction--column">
              <span>Profile</span>
              <textarea data-duice-bind="user" data-duice-property="profile"></textarea>
            </label>
            <div class="grid-column--span-1 display--flex flex-direction--column">
              <span>Gender</span>
              <div>
                <label>
                  <input type="radio" value="M"
                         data-duice-bind="user"
                         data-duice-property="gender"/>
                  <span>Male</span>
                </label>
                <label>
                  <input type="radio" value="F"
                         data-duice-bind="user"
                         data-duice-property="gender"/>
                  <span>Female</span>
                </label>
              </div>
            </div>
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>DateTime</span>
              <input type="datetime-local"
                     data-duice-bind="user"
                     data-duice-property="dateTime">
            </label>
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>Date</span>
              <input type="date"
                     data-duice-bind="user"
                     data-duice-property="date">
            </label>
            <label class="grid-column--span-1 display--flex flex-direction--column">
              <span>Time</span>
              <input type="time"
                     data-duice-bind="user"
                     data-duice-property="time">
            </label>
            <div class="grid-column--span-2 justify-self--end">
              <button type="button" onclick="deleteUser();"
                      data-duice-bind="user"
                      data-duice-execute="Object.keys(user).length < 1 ? this.disabled=true: this.disabled=false;">
                <i class="fa-regular fa-trash-can"></i>
                Delete
              </button>
              <button type="submit" onclick="saveUser();"
                      data-duice-bind="user"
                      data-duice-execute="Object.keys(user).length < 1 ? this.disabled=true: this.disabled=false;">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
</template>

<script>
import {ObjectProxy, ArrayProxy, Initializer, AlertDialog} from 'duice';
export default {
  name: 'MasterDetail',
  data() {
    return {
      userSearch: new ObjectProxy({
        key: null,
        value: null,
        groupId: null,
        active: null,
        _size: 20,
        _page: 1,
        _status: null
      }),
      users: new ArrayProxy([]),
      user: new ObjectProxy({}),
    }
  },
  methods: {
    /**
     * gets users
     * @param page page number
     */
    getUsers(page) {
      this.userSearch._page = page || 0;
      let url = new URL(`${process.env.VUE_APP_API_URL}/api/users`);
      if (this.userSearch.key && this.userSearch.value) {
        url.searchParams.append(this.userSearch.key, this.userSearch.value);
      }
      if (this.userSearch.active) {
        url.searchParams.append('active', this.userSearch.active);
      }
      if (this.userSearch.groupId) {
        url.searchParams.append('groupId', this.userSearch.groupId);
      }
      url.searchParams.append('_size', this.userSearch._size);
      url.searchParams.append('_page', this.userSearch._page);
      this.userSearch._status = 'loading';
      ArrayProxy.clear(this.users);
      this.userSearch._status = 'loading';
      fetch(url)
          .then(response => response.json())
          .then(data => {
            ArrayProxy.assign(this.users, data);
            ArrayProxy.selectItem(this.users, this.users.findIndex(it => it.id === this.user.id));
          }).catch(e => {
        new AlertDialog(e).open();
     }).finally(() => {
        this.userSearch._status = 'completed';
      });
    },
    /**
     * resets users
     */
    resetUsers() {
      ObjectProxy.reset(this.userSearch);
      this.getUsers(0);
    },
    /**
     * gets specified user
     * @param id user id
     */
    getUser(id){
      let url = new URL(`${process.env.VUE_APP_API_URL}/api/users/${id}`);
      ObjectProxy.clear(this.user);
      fetch(url)
          .then(response => response.json())
          .then(data => {
            ObjectProxy.assign(this.user, data);
            ObjectProxy.setDisableAll(this.user, false);
          });
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      Initializer.initialize(this.$el, {
        userSearch: this.userSearch,
        users: this.users,
        user: this.user,
        getUser: this.getUser
      });
    });
    // gets users
    this.getUsers();
  }
};
</script>

<style>
main {
    padding: 2rem;
    display: grid;
    grid-template-areas:
        'title title'
        'master detail';
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;
}
#title {
    grid-area: title;
}
#master {
    grid-area: master;
}
#detail {
    grid-area: detail;
}
</style>