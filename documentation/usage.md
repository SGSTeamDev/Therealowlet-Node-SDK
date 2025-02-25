# Usage Guide

## Response Structure

### Success Response:

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": { ... }
}
```

### Error Response:

```json
{
  "status_code": 401,
  "message": "Invalid API key",
  "data": {
    "error": "Invalid API key"
  }
}
```

**Note:** A request can fail but still return `status_code: 200`. In such cases, the response structure will match that of an error response.

## Response Codes

| Code | Description       |
| ---- | ----------------- |
| 200  | Successful        |
| 400  | Incorrect request |
| 401  | Invalid API key   |
| 404  | Incorrect request |

## Available Methods

### 1. Balance

Retrieves your account balance.

```javascript
const getBalance = async () => {
  const response = await therealowlet.balance();
  console.log(response);
};
```

**Example Response:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": {
    "balance": "100.00",
    "currency": "USD"
  }
}
```

### 2. Services

Fetches a list of available services.

```javascript
const getServices = async () => {
  const response = await therealowlet.services();
  console.log(response);
};
```

**Example Response:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": [
    {
      "service": 1,
      "name": "Followers",
      "type": "Default",
      "category": "First Category",
      "rate": "0.90",
      "min": "50",
      "max": "10000",
      "refill": true,
      "cancel": true
    }
  ]
}
```

### 3. Add Order

Places an order for a service.

To place an order, refer to the 'Add Order' section of [https://therealowlet.com/api ](https://therealowlet.com/api)for detailed parameters based on the type of order you wish to place. Note that you do not need to pass an API key.

```javascript
const addOrder = async () => {
  const response = await therealowlet.Order.add({
    service: 1407,
    link: "https://www.instagram.com/yourusername",
    quantity: 10,
  });
  console.log(response);
};
```

**Example Response:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": {
    "order": 23501
  }
}
```

### 4. Order Status

Retrieve the status of a single or multiple orders.

```javascript
const getStatusOfSingleOrder = async () => {
  const response = await therealowlet.Order.status({
    order: 15159139, // order ID
  });
  console.log(response);
};

const getStatusOfMultipleOrders = async () => {
  const response = await therealowlet.Order.status({
    orders: [15159139, 15223442], // order IDs
  });
  console.log(response);
};
```

**Example Response for Single Order Status:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": {
    "charge": "0.27819",
    "start_count": "3572",
    "status": "Partial",
    "remains": "157",
    "currency": "USD"
  }
}
```

**Example Response for Multiple Orders Status:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": {
    "1": {
      "charge": "0.27819",
      "start_count": "3572",
      "status": "Partial",
      "remains": "157",
      "currency": "USD"
    },
    "10": {
      "error": "Incorrect order ID"
    },
    "100": {
      "charge": "1.44219",
      "start_count": "234",
      "status": "In progress",
      "remains": "10",
      "currency": "USD"
    }
  }
}
```

### 5. Cancel Order

Cancels a single or multiple orders.

```javascript
const cancelSingleOrder = async () => {
  const response = await therealowlet.Order.cancel({
    order: 15159139, // order ID
  });
  console.log(response);
};

const cancelMultipleOrders = async () => {
  const response = await therealowlet.Order.cancel({
    orders: [15159139, 15223442], // order IDs
  });
  console.log(response);
};
```

**Example Response for Single Order:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": {
    "order": 15159139,
    "status": "Cancelled"
  }
}
```

**Example Response for Multiple Orders:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": [
    {
      "order": 9,
      "cancel": {
        "error": "Incorrect order ID"
      }
    },
    {
      "order": 2,
      "cancel": 1
    }
  ]
}
```

### 6. Refill Order

Refills a single or multiple orders.

```javascript
const refillSingleOrder = async () => {
  const response = await therealowlet.Refill.refill({
    order: 15159139, // order ID
  });
  console.log(response);
};

const refillMultipleOrders = async () => {
  const response = await therealowlet.Refill.refill({
    orders: [15159139, 15223442], // order IDs
  });
  console.log(response);
};
```

**Example Response for Single Refill:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": {
    "refill": "1"
  }
}
```

**Example Response for Multiple Refills:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": [
    {
      "order": 1,
      "refill": 1
    },
    {
      "order": 2,
      "refill": 2
    },
    {
      "order": 3,
      "refill": {
        "error": "Incorrect order ID"
      }
    }
  ]
}
```

### 7. Refill Status

Retrieves the status of a single or multiple refills.

```javascript
const getSingleRefillStatus = async () => {
  const response = await therealowlet.Refill.status({
    refill: 15159139, // refill ID
  });
  console.log(response);
};

const getMultipleRefillStatus = async () => {
  const response = await therealowlet.Refill.status({
    refills: [15159139, 15223442], // // refill IDs
  });
  console.log(response);
};
```

**Example Response for Single Refill Status:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": {
    "status": "Completed"
  }
}
```

**Example Response for Multiple Refill Status:**

```json
{
  "status_code": 200,
  "message": "Successful",
  "data": [
    {
      "refill": 1,
      "status": "Completed"
    },
    {
      "refill": 2,
      "status": "Rejected"
    },
    {
      "refill": 3,
      "status": {
        "error": "Refill not found"
      }
    }
  ]
}
```
