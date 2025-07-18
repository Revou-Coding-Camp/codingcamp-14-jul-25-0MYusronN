(function() {
        function askForName() {
            let name = '';
            while (!name || name.trim() === '') {
                name = prompt('Please enter your name:');
                if (name === null) return 'Guest';
                name = name.trim();
            }
            return name;
        }

        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                document.getElementById('welcomeName').textContent = askForName();
            }, 500);
        });
    })();

// ===== MESSAGE FORM ===== //
    (function() {
        const form = document.getElementById('messageForm');
        const recentMessagesContainer = document.getElementById('recentMessages');
        let messages = []; // Temporary in-memory storage
        
        // Set today's date as default
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newMessage = {
                name: document.getElementById('name').value.trim(),
                date: document.getElementById('date').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value || 'Not specified',
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toLocaleString()
            };
            
            if (newMessage.message.length < 10) {
                alert('Message must be at least 10 characters');
                return;
            }
            
            messages.unshift(newMessage); // Add to beginning of array
            displayMessages();
            alert('Message sent successfully!');
            form.reset();
        });
        
        document.getElementById('clearBtn').addEventListener('click', () => {
            form.reset();
            document.getElementById('date').value = new Date().toISOString().split('T')[0];
        });
        
        function displayMessages() {
            recentMessagesContainer.innerHTML = messages.map(msg => `
                <div class="mb-4 p-4 bg-white rounded shadow">
                    <p class="font-semibold text-[#A0522D]">${msg.name}</p>
                    <p class="text-sm text-gray-600">Date: ${msg.date} | Gender: ${msg.gender}</p>
                    <p class="text-sm text-gray-500">${msg.timestamp}</p>
                    <p class="mt-2 text-[#A0522D]">${msg.message}</p>
                </div>
            `).join('');
        }
    })();