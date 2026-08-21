CREATE TABLE "users"(
    "idUser" INTEGER NOT NULL,
    "name" VARCHAR(255) NULL,
    "email" VARCHAR(255) NULL,
    "cpf" VARCHAR(255) NULL,
    "email_verified_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "password" VARCHAR(255) NULL,
    "remember_token" VARCHAR(100) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("idUser");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
ALTER TABLE
    "users" ADD CONSTRAINT "users_cpf_unique" UNIQUE("cpf");
CREATE TABLE "banks"(
    "idBank" INTEGER NOT NULL,
    "name" VARCHAR(255) NULL,
    "codeCOMPE" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "banks" ADD PRIMARY KEY("idBank");
CREATE TABLE "categories"(
    "id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "descriptionTranslated" VARCHAR(255) NOT NULL,
    "parentId" INTEGER NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "categories" ADD PRIMARY KEY("id");
CREATE TABLE "movements"(
    "idMovement" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "totalValue" DECIMAL(10, 2) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "totalInstallments" INTEGER NULL,
    "idCategory" INTEGER NULL,
    "paymentRecurrencyMethod" VARCHAR(255) NULL,
    "transferUUID" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "movements" ADD PRIMARY KEY("idMovement");
CREATE TABLE "installments"(
    "idInstallment" INTEGER NOT NULL,
    "idMovement" INTEGER NULL,
    "plannedDate" DATE NULL,
    "expectedValue" DECIMAL(10, 2) NULL,
    "installmentNumber" INTEGER NULL,
    "status" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "installments" ADD PRIMARY KEY("idInstallment");
CREATE TABLE "users_bank_accounts"(
    "idAccount" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idBank" INTEGER NOT NULL,
    "agencyNumber" VARCHAR(255) NULL,
    "accountNumber" VARCHAR(255) NULL,
    "accountAlias" VARCHAR(255) NULL,
    "accountType" VARCHAR(255) NULL,
    "initialValue" DECIMAL(10, 2) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "isOpenFinance" VARCHAR(255) NOT NULL,
    "openFinanceItemId" VARCHAR(255) NOT NULL,
    "institutionUrl" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users_bank_accounts" ADD PRIMARY KEY("idAccount");
CREATE TABLE "payment_methods"(
    "idPayMethod" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "payMethodType" VARCHAR(255) NOT NULL,
    "idUser" INTEGER NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "payment_methods" ADD PRIMARY KEY("idPayMethod");
CREATE TABLE "users_cards"(
    "idCard" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idBank" INTEGER NULL,
    "idAccount" INTEGER NULL,
    "finalCardNumber" INTEGER NULL,
    "cardAlias" VARCHAR(255) NULL,
    "expirationDate" DATE NULL,
    "defaultPaymentMethod" INTEGER NULL,
    "creditLimit" DECIMAL(10, 2) NULL,
    "status" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "users_cards" ADD PRIMARY KEY("idCard");
CREATE TABLE "transaction"(
    "idTransaction" INTEGER NOT NULL,
    "idInstallment" INTEGER NULL,
    "transactionDescription" VARCHAR(255) NULL,
    "value" DECIMAL(10, 2) NOT NULL,
    "date" DATE NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "idBankAccount" INTEGER NOT NULL,
    "idPaymentMethod" INTEGER NOT NULL,
    "idPaymentCard" INTEGER NULL,
    "idUser" INTEGER NOT NULL,
    "idBill" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);
ALTER TABLE
    "transaction" ADD PRIMARY KEY("idTransaction");
CREATE TABLE "credit_card_bills"(
    "idBill" INTEGER NOT NULL,
    "uuidBill" VARCHAR(255) NOT NULL,
    "idCard" INTEGER NOT NULL,
    "billForecastDate" VARCHAR(255) NOT NULL,
    "billClosingDate" DATE NOT NULL,
    "billStatus" VARCHAR(255) NOT NULL,
    "dueDate" DATE NOT NULL,
    "paymentDate" DATE NOT NULL,
    "paymentMode" VARCHAR(255) NOT NULL,
    "paymentValue" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "credit_card_bills" ADD PRIMARY KEY("idBill");
CREATE TABLE "virtual_user_cards"(
    "idVirtualCard" INTEGER NOT NULL,
    "idMainCard" BIGINT NOT NULL,
    "finalCardNumber" BIGINT NOT NULL,
    "description" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "virtual_user_cards" ADD PRIMARY KEY("idVirtualCard");
ALTER TABLE
    "users_bank_accounts" ADD CONSTRAINT "users_bank_accounts_iduser_foreign" FOREIGN KEY("idUser") REFERENCES "users"("idUser");
ALTER TABLE
    "movements" ADD CONSTRAINT "movements_idcategory_foreign" FOREIGN KEY("idCategory") REFERENCES "categories"("id");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_idbankaccount_foreign" FOREIGN KEY("idBankAccount") REFERENCES "users_bank_accounts"("idAccount");
ALTER TABLE
    "credit_card_bills" ADD CONSTRAINT "credit_card_bills_idcard_foreign" FOREIGN KEY("idCard") REFERENCES "users_cards"("idCard");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_idbill_foreign" FOREIGN KEY("idBill") REFERENCES "credit_card_bills"("idBill");
ALTER TABLE
    "users_cards" ADD CONSTRAINT "users_cards_iduser_foreign" FOREIGN KEY("idUser") REFERENCES "users"("idUser");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_iduser_foreign" FOREIGN KEY("idUser") REFERENCES "users"("idUser");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_idpaymentmethod_foreign" FOREIGN KEY("idPaymentMethod") REFERENCES "payment_methods"("idPayMethod");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_idinstallment_foreign" FOREIGN KEY("idInstallment") REFERENCES "installments"("idInstallment");
ALTER TABLE
    "installments" ADD CONSTRAINT "installments_idmovement_foreign" FOREIGN KEY("idMovement") REFERENCES "movements"("idMovement");
ALTER TABLE
    "virtual_user_cards" ADD CONSTRAINT "virtual_user_cards_idmaincard_foreign" FOREIGN KEY("idMainCard") REFERENCES "users_cards"("idCard");
ALTER TABLE
    "movements" ADD CONSTRAINT "movements_iduser_foreign" FOREIGN KEY("idUser") REFERENCES "users"("idUser");
ALTER TABLE
    "payment_methods" ADD CONSTRAINT "payment_methods_iduser_foreign" FOREIGN KEY("idUser") REFERENCES "users"("idUser");
ALTER TABLE
    "transaction" ADD CONSTRAINT "transaction_idpaymentcard_foreign" FOREIGN KEY("idPaymentCard") REFERENCES "users_cards"("idCard");
ALTER TABLE
    "users_cards" ADD CONSTRAINT "users_cards_idaccount_foreign" FOREIGN KEY("idAccount") REFERENCES "users_bank_accounts"("idAccount");
ALTER TABLE
    "users_bank_accounts" ADD CONSTRAINT "users_bank_accounts_idbank_foreign" FOREIGN KEY("idBank") REFERENCES "banks"("idBank");
ALTER TABLE
    "users_cards" ADD CONSTRAINT "users_cards_idbank_foreign" FOREIGN KEY("idBank") REFERENCES "banks"("idBank");