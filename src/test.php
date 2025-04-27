<?php

class Api
{
    public $api_url = 'https://justanotherpanel.com/api/v2';
    public $api_key = 'your-api-key-here';  // Replace with your actual API key

    // Add order
    public function order($data)
    {
        $post = array_merge(['key' => $this->api_key, 'action' => 'add'], $data);
        return json_decode((string)$this->connect($post));
    }

    // Get order status
    public function status($order_id)
    {
        return json_decode($this->connect([
            'key' => $this->api_key,
            'action' => 'status',
            'order' => $order_id
        ]));
    }

    // Get services
    public function services()
    {
        return json_decode($this->connect([
            'key' => $this->api_key,
            'action' => 'services',
        ]));
    }

    private function connect($post)
    {
        $_post = [];
        if (is_array($post)) {
            foreach ($post as $name => $value) {
                $_post[] = $name . '=' . urlencode($value);
            }
        }

        $ch = curl_init($this->api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        if (is_array($post)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, join('&', $_post));
        }
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)');
        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            $error_message = curl_error($ch);
            curl_close($ch);
            return json_encode(["error" => $error_message]);
        }

        curl_close($ch);

        if (empty($result)) {
            return json_encode(["error" => "No response from the API"]);
        }

        return $result;
    }
}

// Example usage
$api = new Api();
$order = $api->order([
    'service' => 1,
    'link' => 'http://example.com/test',
    'quantity' => 100,
    'runs' => 2,
    'interval' => 5
]);

if (isset($order->order)) {
    echo "Order created with ID: " . $order->order;
    $status = $api->status($order->order);
    echo json_encode($status, JSON_PRETTY_PRINT);
} else {
    echo "Error creating order.";
}
?>
