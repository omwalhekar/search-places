import React, { useEffect, useRef, useState } from 'react';
import PlaceService from './services/place';
import { debounce } from 'lodash';
import Spinner from './components/Spinner';
import './App.scss';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [places, setPlaces] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value && value.length > 2) {
      debouncedHandleSearch(value, page, limit);
    }
  };

  const handlePageChange = (e: any) => {
    const newPage = e.target.value;
    setPage(newPage);
    debouncedHandleSearch(searchQuery, newPage, limit);
  };

  const handleLimitChange = (e: any) => {
    const adjustedLimit = Math.min(Math.max(e.target.value, 5), 10);

    setLimit(adjustedLimit);
    debouncedHandleSearch(searchQuery, page, adjustedLimit);
  };

  const debouncedHandleSearch = useRef(
    debounce(async (query, pageNo, limitValue) => {
      setLoading(true);
      setSearchComplete(false);

      PlaceService.getPlaces(query, (pageNo - 1) * 5, limitValue)
        .then((res: any) => {
          setPlaces((prev: any) => res.data);
          setTotalCount(parseInt(res.metadata.totalCount));
        })
        .finally(() => {
          setLoading(false);
          setSearchComplete(true);
        });
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [debouncedHandleSearch]);

  const totalPages = parseInt((totalCount / limit) as any);

  // Makes input focused on clicking CTRL | CMD + /
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.indexOf('Mac') > -1;
      const modifierKey = isMac ? 'metaKey' : 'ctrlKey'; // Adapt to OS

      if (event[modifierKey] && event.key === '/') {
        // Ensure inputRef is available and not detached
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className='App container'>
      <div className='search-wrapper'>
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={handleInputChange}
          className='search-box'
          type='text'
          placeholder='Search places...'
          autoFocus
        />

        <div className='shortcut-box'>Ctrl + /</div>
      </div>

      {loading && <Spinner />}
      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place: any, index: number) => {
              return (
                <tr key={place.id}>
                  <td>{index + 1}</td>
                  <td>{place.name}</td>
                  <td>{place.country}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {totalCount === 0 && searchComplete && (
          <div className='no-result-box'>No result found</div>
        )}
      </div>

      {totalCount > 0 && (
        <div className='paginator-wrapper'>
          <div className='selector offset-selector'>
            <label>Select page:</label>

            <select
              name='numberDropdown'
              value={page}
              onChange={handlePageChange}
              disabled={totalPages === 0 && !loading}
            >
              {totalPages > 0 && (
                <>
                  {Array(totalPages)
                    .fill(0)
                    .map((i, index) => {
                      const key = index + 1;
                      return (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      );
                    })}
                </>
              )}
            </select>
          </div>
          <div className='selector limit-selector'>
            <label>Result Limit:</label>
            <input
              type='number'
              min={5}
              max={10}
              value={limit}
              onChange={handleLimitChange}
              disabled={totalCount === 0 && !loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
