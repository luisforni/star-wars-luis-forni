import { Router } from 'express';
import { deleteRegister, getRegister, getRegisterCount, getRegisters, saveRegister, updateRegister } from '../controllers/registers';

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Registers
 *  description: Registers endpoint
 */

/**
 * @swagger
 * /registers:
 *  get:
 *      sumary: Get all registers
 *      tags: [Registers]
 */
router.get('/registers', getRegisters)

/**
 * @swagger
 * /registers/count:
 *  get:
 *      sumary: Get total registers counter
 *      tags: [Registers]
 */
router.get('/registers/count', getRegisterCount)

/**
 * @swagger
 * /registers:
 *  get:
 *      sumary: Get all register by id
 *      tags: [Registers]
 */
router.get('/registers/:id', getRegister)

/**
 * @swagger
 * /registers:
 *  post:
 *      sumary: Save a new register
 *      tags: [Registers]
 */
router.post('/registers/', saveRegister)

/**
 * @swagger
 * /registers:
 *  delete:
 *      sumary: Delete a register by id
 *      tags: [Registers]
 */
router.delete('/registers/:id', deleteRegister)

/**
 * @swagger
 * /registers:
 *  put:
 *      sumary: Update a register by id
 *      tags: [Registers]
 */
router.put('/registers/:id', updateRegister)

export default router