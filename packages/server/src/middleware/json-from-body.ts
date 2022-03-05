import express = require('express')
import type { RequestHandler } from 'express'

export const jsonFromBody: RequestHandler = (request, response, next) => express.json()(request, response, next)