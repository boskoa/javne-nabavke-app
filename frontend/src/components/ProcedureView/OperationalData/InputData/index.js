/*const InputData = () => {
  return (
    <FormGroup>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel
          id="procedureType"
          sx={{ fontSize: '0.8rem' }}
        >
          Vrsta postupka
        </InputLabel>
        <Select
          disabled={!(procedure.user.id === userId)}
          labelId="procedureType"
          id="selectType"
          value={procedure.category}
          sx={{ height: '2.5rem', fontSize: '0.8rem' }}
          label="Vrsta postupka"
          onChange={(e) => handleSelectType(e)}
        >
          <MenuItem value='Direktni sporazum' sx={{ fontSize: '0.8rem' }}>
                  Direktni sporazum
          </MenuItem>
          <MenuItem value='Konkurentski zahtev' sx={{ fontSize: '0.8rem' }}>
                  Konkurentski zahtev
          </MenuItem>
          <MenuItem value='Otvoreni postupak' sx={{ fontSize: '0.8rem' }}>
                  Otvoreni postupak
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel
          id="criterion"
          sx={{ fontSize: '0.8rem' }}
        >
                  Kriterijum odabira ponude
        </InputLabel>
        <Select
          disabled={!(procedure.user.id === userId)}
          labelId="criterion"
          id="selectCriterion"
          value={procedure.criterion}
          sx={{ height: '2.5rem', fontSize: '0.8rem' }}
          label="Kriterijum odabira ponude"
          onChange={(e) => handleSelectCriterion(e)}
        >
          <MenuItem value='Najniža cena' sx={{ fontSize: '0.8rem' }}>
                  Najniža cena
          </MenuItem>
          <MenuItem value='Ekonomski najpovoljnija ponuda' sx={{ fontSize: '0.8rem' }}>
                  Ekonomski najpovoljnija ponuda
          </MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          disabled={!(procedure.user.id === userId)}
          fullWidth
          ampm={false}
          renderInput={(props) => <TextField {...props} />}
          label="Rok za predaju"
          sx={{ height: '2.5rem', fontSize: '0.8rem' }}
          value={date}
          onChange={(newValue) => {
            setDate(newValue)
          }}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <TextField
          disabled={!(procedure.user.id === userId)}
          size="small"
          label="Budžet"
          id="budget"
          sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5,mt: 4 }}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          onBlur={handleBudget}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          disabled={!(procedure.user.id === userId)}
          size="small"
          label="Rok isporuke (u danima)"
          id="deliveryDate"
          sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          onBlur={handleDelivery}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <DeliveryLocation procedure={procedure} userId={userId} />
      <FormControl fullWidth>
        <TextField
          disabled={!(procedure.user.id === userId)}
          size="small"
          label="Važenje ponude (u danima)"
          id="offerValidity"
          sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          onBlur={handleValidity}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          disabled={!(procedure.user.id === userId)}
          size="small"
          label="Rok plaćanja (u danima)"
          id="payment"
          sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          onBlur={handlePayment}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          disabled={!(procedure.user.id === userId)}
          size="small"
          label="Broj kopija ponude"
          id="copy"
          sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
          value={copy}
          onChange={(e) => setCopy(e.target.value)}
          onBlur={handleCopy}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          disabled={!(procedure.user.id === userId)}
          size="small"
          label="Vrednost ponude"
          id="amount"
          sx={{ height: '2.5rem', fontSize: '0.8rem', mb: 1.5 }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={handleAmount}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    </FormGroup>
  )
}

export default InputData*/