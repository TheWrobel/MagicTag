import axios from 'axios'
import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

import Table from 'react-bootstrap/Table'

const TagListView = ({ headers, setLoading }) => {
    const [tagList, setTagList] = useState({}); 
        const loadTags = async () => {
            try {
                setLoading(true);
                const dataReq = await axios.post("http://192.168.42.21:7001/MagicInfo/restapi/v2.0/ems/settings/tags/filter", config, {headers})
                console.log(dataReq)
                await setTagList(dataReq);
                setLoading(false);
            }
            catch(error) {
                console.log(error)
                alert("Błąd" + error)
                setLoading(false);
            }
            console.log(tagList);
        }

    const config = {
        "deviceId": "string",
        "organId": "all",
        "pageSize": 100,
        "sortColumn": "tag_id",
        "sortOrder": "asc",
        "startIndex": 0
    }    
    return (
        <div className="mainContainer">
            <Button onClick={loadTags}>Load Tags</Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Tag ID</th>
                    <th>Tag Name</th>
                    <th>Num of Devices</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {tagList.map((row) => (
                    <tr key={row.tagId}>
                    <td>{row.tagId}</td>
                    <td>{row.tagName}</td>
                    <td>{row.deviceCount}</td>
                    <td>{row.tagDesc}</td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
        </div>
    )
}

export default TagListView
