import React from 'react';

const Transactions = () => {
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Vote</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td colSpan={8}>No results found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;