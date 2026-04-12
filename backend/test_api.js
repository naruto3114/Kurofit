const testRegister = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "testuser",
                email: "testuser" + Date.now() + "@gmail.com",
                password: "password123"
            })
        });

        console.log("Status Code:", response.status);
        const data = await response.json();
        console.log("Response:", data);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

testRegister();
