CREATE TABLE IF NOT EXISTS loan (
	code text,
	amount numeric,
  period integer,
  rate numeric,
  type text
);

CREATE TABLE IF NOT EXISTS installment (
	loan_code text,
  number integer,
  amount numeric,
  interest numeric,
  amortization numeric,
  balance numeric
);

SELECT * FROM installment;

SELECT * FROM loan;


DELETE FROM installment;

DELETE FROM loan;
