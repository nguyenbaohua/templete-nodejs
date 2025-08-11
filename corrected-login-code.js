// Frontend Login Function - Corrected for Node.js Backend API
const handleLogin = async (e) => {
	e.preventDefault()
	try {
		// Validate input - API expects email, not username
		if (!email || !password) {
			alert('Please enter both email and password')
			return
		}

		// Fixed URL (removed duplicate http://)
		const endpoint = 'http://localhost:3000/api/auth/login'
		
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }), // Changed from username to email
		})
		
		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Login failed')
		}
		
		const data = await response.json()
		
		// Check if login was successful based on API response format
		if (data.success) {
			console.log('Login success:', data)
			
			// Save token to localStorage
			localStorage.setItem('token', data.data.token)
			
			// Save user info if needed
			localStorage.setItem('user', JSON.stringify(data.data.user))
			
			// Navigate to home page
			navigate('/')
		} else {
			throw new Error(data.message || 'Login failed')
		}
		
	} catch (error) {
		console.error('Login error:', error)
		alert(error.message || 'Login failed!')
	}
}

// Example of how to use the token for authenticated requests
const makeAuthenticatedRequest = async (url) => {
	const token = localStorage.getItem('token')
	
	if (!token) {
		throw new Error('No authentication token found')
	}
	
	const response = await fetch(url, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
	
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || 'Request failed')
	}
	
	return response.json()
}

// Example: Get user profile
const getUserProfile = async () => {
	try {
		const data = await makeAuthenticatedRequest('http://localhost:3000/api/auth/profile')
		console.log('User profile:', data.data.user)
		return data.data.user
	} catch (error) {
		console.error('Failed to get profile:', error)
		// Handle error (e.g., redirect to login if token is invalid)
		if (error.message.includes('token')) {
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			navigate('/login')
		}
	}
}

// Example: Logout function
const handleLogout = async () => {
	try {
		// Call logout endpoint
		await fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Logout error:', error)
	} finally {
		// Clear local storage
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		
		// Navigate to login page
		navigate('/login')
	}
}
