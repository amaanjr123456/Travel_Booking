const API_URL = "/api/bookings";

// Function to Load All Bookings
async function loadBookings() {
    const tableBody = document.getElementById('adminTableBody');
    tableBody.innerHTML = "<tr><td colspan='6'>Loading bookings...</td></tr>";

    try {
        const response = await fetch(API_URL);
        const bookings = await response.json();

        tableBody.innerHTML = ""; // Clear loading message
        
        bookings.forEach(book => {
            tableBody.innerHTML += `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.place}</td>
                    <td><span class="status-${book.status}">${book.status}</span></td>
                    <td>
                        <button onclick="updateStatus('${book.id}', 'accepted')" class="btn-approve">Approve</button>
                        <button onclick="updateStatus('${book.id}', 'declined')" class="btn-reject">Reject</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        tableBody.innerHTML = "<tr><td colspan='6' style='color:red;'>Error loading data.</td></tr>";
    }
}

// Function to Update Status
window.updateStatus = async function(id, newStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            alert(`Booking ${id} is now ${newStatus}!`);
            loadBookings(); // Refresh the list
        }
    } catch (err) {
        alert("Failed to update status.");
    }
};

// Load data when page opens
loadBookings();
