const express = require('express');
const { mockVehicles } = require('../data/mockVehicles');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/vehicles - Get vehicles by company_id and location_id
router.post('/vehicles', authenticateToken, async (req, res) => {
  try {
    const { company_id, locaion_id } = req.body;

    // Validate required fields
    if (!company_id || !locaion_id) {
      return res.status(400).json({
        success: false,
        message: 'company_id and locaion_id are required'
      });
    }

    // Convert to numbers for comparison
    const companyId = parseInt(company_id);
    const locationId = parseInt(locaion_id);

    // Validate that they are valid numbers
    if (isNaN(companyId) || isNaN(locationId)) {
      return res.status(400).json({
        success: false,
        message: 'company_id and locaion_id must be valid numbers'
      });
    }

    // Filter vehicles by company_id and location_id
    const filteredVehicles = mockVehicles.filter(vehicle => 
      vehicle.company_id === companyId && vehicle.locaion_id === locationId
    );

    res.status(200).json({
      success: true,
      message: 'Vehicles retrieved successfully',
      data: {
        vehicles: filteredVehicles,
        total: filteredVehicles.length,
        filters: {
          company_id: companyId,
          locaion_id: locationId
        }
      }
    });

  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/vehicles/all - Get all vehicles (for admin purposes)
router.get('/vehicles/all', authenticateToken, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'All vehicles retrieved successfully',
      data: {
        vehicles: mockVehicles,
        total: mockVehicles.length
      }
    });
  } catch (error) {
    console.error('Get all vehicles error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/vehicles/:id - Get vehicle by ID
router.get('/vehicles/:id', authenticateToken, async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);

    if (isNaN(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID'
      });
    }

    const vehicle = mockVehicles.find(v => v.id === vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle retrieved successfully',
      data: {
        vehicle
      }
    });

  } catch (error) {
    console.error('Get vehicle by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
