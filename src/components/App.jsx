import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

import * as API from './services/api';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class App extends Component {
  state = {
    searchValue: '',
    response: null,
    page: 1,
    status: 'idle',
    showModal: false,
    largeImg: 'null',
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (searchValue !== prevState.searchValue) {
      this.setState({ status: STATUS.pending });

      try {
        const { hits } = await API.getImage(searchValue, page);
        if (hits.length === 0) {
          throw new Error(`not found`);
        }
        this.setState({
          response: hits,
          status: STATUS.resolved,
        });
      } catch (error) {
        this.setState({ status: STATUS.rejected });
      }
    }

    if (page !== prevState.page) {
      this.setState({ status: STATUS.pending });
      try {
        const { hits, totalHits } = await API.getImage(searchValue, page);

        if (page > Math.round(totalHits / 12)) {
          <Toaster position="top-center" reverseOrder={false} />;

          toast.error(`That it!`);

          this.setState({ status: STATUS.idle });
          return;
        }
        this.setState(({ response }) => {
          return {
            response: [...response, ...hits],
            status: STATUS.resolved,
          };
        });
      } catch (error) {
        this.setState({ status: STATUS.rejected });
      }
    }
  }

  toggleModal = largeImg => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal, largeImg };
    });
  };

  onSubmit = searchValue => {
    this.setState({ searchValue });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    const { status, showModal, response, largeImg, searchValue } = this.state;

    return (
      <div>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImg} alt="" />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmit}></Searchbar>

        {status === 'idle' && ''}
        {status === 'pending' && <Loader></Loader>}
        {status === 'resolved' && (
          <>
            <ImageGallery
              response={response}
              toggleModal={this.toggleModal}
            ></ImageGallery>
            <Button onClick={this.handleLoadMore}></Button>
          </>
        )}
        {status === 'rejected' && (
          <div>
            <Toaster position="top-center" reverseOrder={false} />
            {toast.error(`${searchValue} not found!`)}
          </div>
        )}
      </div>
    );
  }
}
