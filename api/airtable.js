const BASE_ID  = 'appcMEfMb9nbcfVi2';
const TABLE_ID = 'tbl1Qgh7CUnuyZLBC';

export default async function handler(req, res) {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'AIRTABLE_TOKEN is not configured on the server.' });
  }

  let records = [], offset = null;

  try {
    do {
      const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
      // DEBUG: fetch ALL fields to discover available field names
      // url.searchParams.append('fields[]', 'Name');
      // url.searchParams.append('fields[]', 'Revenue ($M)');
      // url.searchParams.append('fields[]', 'EBITDA ($M)');
      // url.searchParams.append('fields[]', 'Active Deal Stage');
      // url.searchParams.append('fields[]', 'Expected Close');
      // url.searchParams.append('fields[]', 'Companies');
      url.searchParams.set('filterByFormula', "FIND('Shield TP', ARRAYJOIN({Companies}))");
      if (offset) url.searchParams.set('offset', offset);

      const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `Airtable returned status ${response.status}` });
      }

      const json = await response.json();
      records = records.concat(json.records || []);
      offset = json.offset || null;
    } while (offset);

    res.status(200).json({ records });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch from Airtable.' });
  }
}
