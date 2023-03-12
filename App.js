import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { useState, useEffect } from 'react';
import Counter from './contracts/Counter.sol/Counter.json';
import { ethers } from 'ethers';
import './global.css';

var counterAddress = '0x9513cB7DF4E87c8aA4b832395e1111f99218ca04';
console.log(counterAddress, 'Counter ABI: ', Counter.abi);

function App() {
  var _this = this;

  var requestAccount = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return window.ethereum.request({ method: 'eth_requestAccounts' });

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function requestAccount() {
      return _ref.apply(this, arguments);
    };
  }();

  var updateCounter = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var provider, signer, contract, transaction;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(typeof window.ethereum !== 'undefined')) {
                _context3.next = 15;
                break;
              }

              _context3.next = 3;
              return requestAccount();

            case 3:
              provider = new ethers.providers.Web3Provider(window.ethereum);

              console.log({ provider: provider });
              signer = provider.getSigner();
              contract = new ethers.Contract(counterAddress, Counter.abi, signer);
              _context3.next = 9;
              return contract.increment();

            case 9:
              transaction = _context3.sent;

              setIsLoading(true);
              _context3.next = 13;
              return transaction.wait();

            case 13:
              setIsLoading(false);
              readCounterValue();

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function updateCounter() {
      return _ref3.apply(this, arguments);
    };
  }();

  var readCounterValue = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
      var provider, contract, data;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(typeof window.ethereum !== 'undefined')) {
                _context5.next = 18;
                break;
              }

              provider = new ethers.providers.Web3Provider(window.ethereum);

              console.log('provider', provider);
              contract = new ethers.Contract(counterAddress, Counter.abi, provider);

              console.log('contract', contract);
              _context5.prev = 5;
              _context5.next = 8;
              return contract.retrieve();

            case 8:
              data = _context5.sent;

              console.log(data);
              console.log('data: ', parseInt(data.toString()));
              setCount(parseInt(data.toString()));
              _context5.next = 18;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5['catch'](5);

              console.log('Error: ', _context5.t0);
              alert('Switch your MetaMask network to Polygon zkEVM testnet and refresh this page!');

            case 18:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[5, 14]]);
    }));

    return function readCounterValue() {
      return _ref5.apply(this, arguments);
    };
  }();

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var incrementCounter = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return updateCounter();

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function incrementCounter() {
      return _ref2.apply(this, arguments);
    };
  }();

  useEffect(function () {
    // declare the data fetching function
    var fetchCount = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var data;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return readCounterValue();

              case 2:
                data = _context4.sent;
                return _context4.abrupt('return', data);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }));

      return function fetchCount() {
        return _ref4.apply(this, arguments);
      };
    }();

    fetchCount().catch(console.error);
  }, []);

  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Count: ',
      count
    ),
    React.createElement(
      'button',
      { onClick: incrementCounter, disabled: isLoading },
      isLoading ? 'loading...' : '+1'
    )
  );
}

export default App;