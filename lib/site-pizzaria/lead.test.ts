import { test } from 'node:test'
import assert from 'node:assert/strict'
import { referenceFor, validateLead } from './lead.ts'

const now = new Date('2026-10-20T12:00:00Z')
const ok = {
  submissionId: '3f2b8c1a-9d4e-4f6a-8b2c-1d2e3f4a5b6c',
  firstName: ' Ana ',
  business: 'Pizzaria do Bairro',
  phone: '+351 912 345 678',
  consent: true,
  attribution: { utm_source: 'meta', utm_campaign: 'site-149', evil: 'x', utm_id: '' },
}

test('a valid lead keeps the campaign and a reference tied to its submission', () => {
  const result = validateLead(ok, now)
  assert.ok('lead' in result)
  assert.equal(result.lead.firstName, 'Ana')
  assert.equal(result.lead.reference, 'SPZ-3F2B8C1A')
  assert.deepEqual(result.lead.attribution, { utm_source: 'meta', utm_campaign: 'site-149' })
  assert.equal(result.lead.campaignId, 'site-149')
  assert.equal(result.lead.createdAt, '2026-10-20T12:00:00.000Z')
})

test('a retry of the same submission gets the same reference', () => {
  assert.equal(referenceFor(ok.submissionId), referenceFor(ok.submissionId.toUpperCase().toLowerCase()))
})

test('each missing or wrong field is named, so the form can point at it', () => {
  const cases: [Record<string, unknown>, string][] = [
    [{ ...ok, submissionId: 'abc' }, 'submissionId'],
    [{ ...ok, firstName: 'A' }, 'firstName'],
    [{ ...ok, business: '' }, 'business'],
    [{ ...ok, phone: '12345' }, 'phone'],
    [{ ...ok, phone: '912 345 678 ou outro' }, 'phone'],
    [{ ...ok, consent: 'on' }, 'consent'],
  ]
  for (const [body, field] of cases) {
    const result = validateLead(body, now)
    assert.ok('error' in result, field)
    assert.equal(result.error.field, field)
  }
})
