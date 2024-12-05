PostgreSQL Equivalent
DeleteOne: PostgreSQL does not have a direct LIMIT clause for DELETE, but you can achieve the same result with a CTE:

1:DELETE FROM dataall
WHERE ctid = (
    SELECT ctid FROM dataall WHERE item = 'canvas' LIMIT 1
);


DELETE FROM dataall WHERE id = (SELECT id FROM dataall WHERE item = 'canvas' LIMIT 1);


2::DeleteMany

DELETE FROM dataall WHERE qty = 10;

DELETE FROM dataall;


0::Code Example for PostgreSQL (Using Node.js and pg library)

const deleteOne = async () => {
    const query = `
      DELETE FROM dataall
      WHERE ctid = (
        SELECT ctid FROM dataall WHERE item = $1 LIMIT 1
      );
    `;
    const values = ['canvas'];
    await client.query(query, values);
  };

  
  const deleteMany = async () => {
    const query = 'DELETE FROM dataall WHERE qty = $1;';
    const values = [10];
    await client.query(query, values);
  };
  

  const deleteAll = async () => {
    const query = 'DELETE FROM dataall;';
    await client.query(query);
  };


  app.delete('/delete-user/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  console.log(result)
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(204).send(); // 204 No Content, successful deletion
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  });
  
  
  

  :::::::::::::::: Update queary alll in post :::::::::::::::::::::::::


  app.put('/update-user/:id', async (req, res) => {
    const { id } = req.params; // Get the name from the URL
    const { name } = req.body; // Get the new email from the request body
  
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
      );
  
      console.log(result.rows);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
  
      res.status(500).json({ error: error.message });
    }
  });



  PostgreSQL Equivalent
In PostgreSQL, the UPDATE statement is used to perform both single and multiple row updates.

UpdateOne

UPDATE dataall
SET qty = 50
WHERE item = 'mat'
LIMIT 1; -- PostgreSQL does not directly support LIMIT in UPDATE. Use ctid to target one row instead.


UPDATE dataall
SET qty = 69
WHERE qty = 25;


UPDATE dataall
SET isEligible = true
WHERE qty >= 14;




For strict single-row update: ...........

WITH cte AS (
    SELECT ctid FROM dataall WHERE item = 'mat' LIMIT 1
)
UPDATE dataall
SET qty = 50
WHERE ctid = (SELECT ctid FROM cte);


UpdateMany .................

UPDATE dataall
SET status = 'updated'
WHERE qty = 25;


2:::Code Example for PostgreSQL (Node.js with pg library)

const updateMany = async () => {
    const query = `
      UPDATE dataall
      SET status = $1
      WHERE qty = $2;
    `;
    const values = ['updated', 25];
    await client.query(query, values);
  };
  


  const updateOne = async () => {
    const query = `
      WITH cte AS (
        SELECT ctid FROM dataall WHERE item = $1 LIMIT 1
      )
      UPDATE dataall
      SET qty = $2
      WHERE ctid = (SELECT ctid FROM cte);
    `;
    const values = ['mat', 50];
    await client.query(query, values);
  };
  


  const updateManyEligibility = async () => {
    const query = `
      UPDATE dataall
      SET isEligible = $1
      WHERE qty >= $2;
    `;
    const values = [true, 14];
    await client.query(query, values);
  };
  

  const updateManyQty = async () => {
    const query = `
      UPDATE dataall
      SET qty = $1
      WHERE qty = $2;
    `;
    const values = [69, 25];
    await client.query(query, values);
  };
  